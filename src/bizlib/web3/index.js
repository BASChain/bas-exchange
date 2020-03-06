import Web3 from 'web3'
import store from '@/store'
import apiTypes from '@/store/modules/web3/mutation-types'
import ContractManager from '../abi-manager/index'
import { checkSupport } from '../networks'

import { getBasOANNInstance } from './domain-api'
import { basTokenInstance} from './instances'

import * as ErrCodes from './error-codes'


/**
 *
 */
export const checkMetaMaskInject = ()=>{
  return window.web3 && window.ethereum && window.ethereum.isMetaMask;
}

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

/**
 * mounted proid used
 */
export function getDappChainAndWallet(){
  return {
    chainId:currentChainId()||3,
    wallet:currentWallet()||''
  }
}

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

/**
 *
 */
export function currentChainId() {
  if(!ethereum || !ethereum.chainId)return 3
  return parseInt(ethereum.chainId)
}

export function currentWallet() {
  if(!ethereum || !ethereum.selectedAddress)return ''
  return ethereum.selectedAddress
}

/**
 * 可以指定web3,可以null
 * @param {web3} web3js
 */
export async function getCurrentWallet(web3js){
  if(!web3js)web3js = window.web3
  if(!web3js) '';
  let wallets = await web3js.eth.getAccounts()
  return wallets.length ? wallets[0] : '';
}





export function getBasTokenInstance(chainId){
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

  let inst = getBasTokenInstance(chainId);
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
  if(!currentWallet())throw 4001
  let options = {
    from : currentWallet()
  }
  let approveAddress = ContractManager.BasOANN(chainId).address;
  let inst = getBasTokenInstance(chainId);
  return inst.methods.approve(approveAddress,costWei).send(options)
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
  let web3js = getWeb3()

  if(!ethereum.eventNames().find(n=>n === 'accountsChanged')){
    console.log('load listenerNetwork')
    ethereum.on('accountsChanged',async function(accounts){
      let chainId = await web3js.eth.getChainId()
      if(accounts.length){
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`,accounts[0])
        web3js.eth.getBalance(accounts[0]).then(bal =>{
          store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`,bal)
        })
        //BAS
        if(chainId && checkSupport(chainId)){
          let option = { from: accounts[0]}
          //let
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
  // if(!ethereum.eventNames().find(n=>n === 'networkChanged')){
  //   ethereum.on('networkChanged',function(chainId){
  //     console.log('Chain change',chainId)

  //     store.commit(`web3/${apiTypes.UPDATE_CHAINID}`,chainId)
  //     web3js.eth.getBalance(wallet).then(bal =>{
  //       store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`,bal)
  //     })
  //     if( checkSupport(chainId)){
  //       // let option = store.getters['web3/transOptions']
  //       // store.dispatch('web3/basTokenUpdate',{
  //       //   chainId:chainId,
  //       //   option
  //       // })
  //     }else{
  //       store.commit(`web3/${apiTypes.UPDATE_BASBAL}`,'')
  //     }
  //   })
  // }

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


export function getWeb3(){
  if(!window.ethereum)throw ErrCodes.E9998
  if(!window.web3)throw errorCodes.E9997
  return window.web3
}

export async function enableWeb3(){
  return new Promise((resolve,reject)=>{

  })
}


/**
 *
 * @param {*} web3js
 */
export async function DappMetaMaskListener(web3js){
  if (!ethereum) {
    console.log('no web3,listener stop.')
    return;
  }
  if (!web3js) web3js = getWeb3()
  //
  if(!ethereum.eventNames().find(n => n === 'accountsChanged')){
    ethereum.on('accountsChanged', async function (accounts) {
      let chainId = await web3js.eth.getChainId()
      if (accounts.length) {
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`, accounts[0])
        web3js.eth.getBalance(accounts[0]).then(bal => {
          store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`, bal)
        })
        //BAS
        if (chainId && checkSupport(chainId)) {
          let token = basTokenInstance(web3js, chainId, { from: accounts[0]})
          let basBal = await token.methods.balanceOf(accounts[0]).call()
          console.log('basBal>>>',basBal)
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, basBal)
          //let
        } else {
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, '')
        }
      } else {
        store.commit(`web3/${apiTypes.UPDATE_WALLET}`, '')
        store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, '')
      }
    })
  }

/**
 * MetaMask team so shit ,Introduction of their official API,
 * the new API is tells
 * networkChanged now feature will chainChanged
 */
  if(!ethereum.eventNames().find(n=>n === 'networkChanged')){
    ethereum.on('networkChanged',async function(chainId){
      console.log('Chain change',chainId)
      let accounts = await web3js.eth.getAccounts();
      store.commit(`web3/${apiTypes.UPDATE_CHAINID}`,chainId)
      if(accounts.length){
        let wallet = accounts[0]
        web3js.eth.getBalance(wallet).then(bal => {
          store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`, bal)
        })

        if (checkSupport(chainId)) {
          let token = basTokenInstance(web3js, chainId, { from: accounts[0] })
          let basBal =await token.methods.balanceOf(accounts[0]).call()
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, basBal)
        } else {
          store.commit(`web3/${apiTypes.UPDATE_BASBAL}`, '')
        }
      }
    })
  }
}


export function checkSupport4Search(){
  if(window.web3){
    let chainId = currentChainId()
    return checkSupport(chainId);
  }else{
    return true;
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

