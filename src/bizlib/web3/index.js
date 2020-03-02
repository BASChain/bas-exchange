import Web3 from 'web3'
import store from '@/store'
import apiTypes from '@/store/modules/web3/mutation-types'
import ContractManager from '../abi-manager/index'
import { checkSupport } from '../networks'

import { getBasOANNInstance } from './domain-api'
import { diffBn } from '@/utils'


export const checkMetaMask = new Promise((resolve,reject)=>{
  if(window.web3 === undefined){
    reject(new Error('Metamask unfound in your browser'))
  }
  window.ethereum.autoRefreshOnNetworkChange = false;
  let flag = !!(window.web3 && window.ethereum && window.ethereum.isMetaMask)
  let web3js = window.web3;
  var web3 = new Web3(web3js.currentProvider)
  //gloal
  window.web3 = web3
  resolve({
    isInjected:flag,
  })
})

export async function connectMetamask(){
  let ethereum = window.ethereum
  let accounts = await ethereum.enable()
  let wallet = accounts[0];
  let web3js = window.web3
  //new Web3(window.web3.currentProvider)
  let chainId = await web3js.eth.getChainId()
  let gasPrice = await web3js.eth.getGasPrice()
  let approvAddress = ContractManager.BasOANN(chainId).address;
  //console.log(gasPrice)
  var bal = await web3js.eth.getBalance(wallet);
  return {
    approvAddress,
    chainId,
    wallet,
    gasPrice,
    ethBal:bal
  }
}

export const currentWallet = ()=>{
  if(!ethereum || !ethereum.selectedAddress)return ''
  return ethereum.selectedAddress
}

/**
 *
 */
export const currentChainId = ()=> {
  if(!ethereum || !ethereum.chainId)return 3
  return parseInt(ethereum.chainId)
}



export function getBasTokenInstance(chainId,option){
  const BasTokenContract = ContractManager.BasToken(chainId)
  let abi = BasTokenContract.abi;

  let web3js = window.web3
  //new Web3(window.web3.currentProvider)
  return new web3js.eth.Contract(abi,BasTokenContract.address)
}

export async function approveBasToken(chainId,wallet,costWei){
  if(!checkSupport(chainId))throw '3001:unsupport network';
  let opts = store.getters['web3/transOptions']
  let approveAddress = ContractManager.BasOANN(chainId).address;

  let inst = getBasTokenInstance(chainId,opts);
  let basBal = await inst.methods.balanceOf(wallet).call()
  store.commit('web3/updateBASBalance',basBal)

  let diff = basBal/(10**18) - costWei/(10**18)
  console.log(basBal,costWei,diff,approveAddress)

  if(parseInt(diff)<0)throw '3002: Insufficient balance'

  let approveResp = await inst.methods.approve(approveAddress,costWei).send(opts)
  console.log('>>>',approveResp)
  return approveResp
}

/**
 * Event emitter
 *
 * @param {*} chainId
 * @param {*} wallet
 * @param {*} costWei
 */
export function approveBasTokenEmitter(chainId,costWei){
  let opts = store.getters['web3/transOptions']
  let approveAddress = ContractManager.BasOANN(chainId).address;
  let inst = getBasTokenInstance(chainId,opts);
  return inst.methods.approve(approveAddress,costWei).send(opts)
}

export async function initAppEth(web3js,wallet){
  if(!web3js)return;
  let chainId = await web3js.eth.getChainId()
  let gasPrice = await web3js.eth.getGasPrice()
  var bal = await web3js.eth.getBalance(wallet);

  return {
    wallet,
    chainId,
    gasPrice,
    bal
  }
}

/**
 * refresh Page
 * TODO
 */
export async function initConnectMetamask(){
  let eth = window.ethereum
  if(!window.ethereum || !window.ethereum.selectedAddress ||!ethereum.chainId){
    console.log('does not init Page login...')
    return;
  }
  console.log('does auto init Page login...')
  let wallet = window.ethereum.selectedAddress
  let web3js = window.web3;
  let ret = await initAppEth(web3js,wallet)
  return ret;
}

/**
 *
 * @param {*} wallet
 */
export function listenerNetwork(wallet){
  let ethereum = window.ethereum
  let web3js = new Web3(window.web3.currentProvider)

  if(!ethereum.eventNames().find(n=>n === 'accountsChanged')){
    ethereum.on('accountsChanged',function(accounts){
      let chainId = store.state.web3.chainId;
      if(accounts.length){
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`,accounts[0])
        web3js.eth.getBalance(accounts[0]).then(bal =>{
          store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`,bal)
        })
        //BAS
        if(chainId && checkSupport(chainId)){
          let option = store.getters['web3/transOptions']
          store.dispatch('web3/basTokenUpdate',{
            chainId:chainId,
            option
          })
        }else{
          store.commit(`${apiTypes.UPDATE_BASBAL}`,'')
        }
      }else{
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`,'')
        store.commit(`web3/${apiTypes.UPDATE_BASBAL}`,'')
      }
    })
  }

  /**
   * MetaMask team so shit ,Introduction of their official API,
   * the new API is tells
   * networkChanged now feature will chainChanged
   */
  if(!ethereum.eventNames().find(n=>n === 'networkChanged')){
    ethereum.on('networkChanged',function(chainId){
      console.log('Chain change',chainId)
      store.commit(`web3/${apiTypes.UPDATE_CHAINID}`,chainId)
      web3js.eth.getBalance(wallet).then(bal =>{
        store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`,bal)
      })
      if( checkSupport(chainId)){
        let option = store.getters['web3/transOptions']
        store.dispatch('web3/basTokenUpdate',{
          chainId:chainId,
          option
        })
      }else{
        store.commit(`web3/${apiTypes.UPDATE_BASBAL}`,'')
      }
    })
  }

}

/**
 * 初始化OANN 参数
 * @param {*} chainId
 */
export async function initOANNConfigs(chainId,options ={}) {
  let web3js = window.web3
  if(!checkSupport(chainId) || !web3js){
    //
    return false
  }
  try{
    let inst = getBasOANNInstance(chainId,web3js,options)
    let rareGas = await inst.methods.AROOT_GAS().call()
    let topGas = await inst.methods.BROOT_GAS().call()
    let subGas = await inst.methods.SUB_GAS().call()
    let customedPriceGas = await inst.methods.CUSTOMED_PRICE_GAS().call()
    let maxYearReg = await inst.methods.MAX_YEAR_REG().call()

    let payload = {rareGas,topGas,subGas,customedPriceGas,maxYearReg}
    console.log(payload)
    store.commit('web3/updateOANNData',payload)
  }catch(ex){
    console.error(ex)
  }
}


export default {
  checkMetaMask,
  connectMetamask,
  initConnectMetamask,
  listenerNetwork,
  getBasTokenInstance,
  initOANNConfigs,
}

