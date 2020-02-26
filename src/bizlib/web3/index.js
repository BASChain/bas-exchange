import Web3 from 'web3'
import store from '@/store'
import apiTypes from '@/store/modules/web3/mutation-types'
import ContractManager from '../abi-manager/index'
import { checkSupport } from '../networks'


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
  //console.log(gasPrice)
  var bal = await web3js.eth.getBalance(wallet);
  return {
    chainId,
    wallet,
    gasPrice,
    ethBal:bal
  }
}

export function getBasTokenInstance(chainId,option){
  const BasTokenContract = ContractManager.BasToken(chainId)
  let abi = BasTokenContract.abi;

  let web3js = window.web3
  //new Web3(window.web3.currentProvider)

  if(BasTokenContract.address){
    return new web3js.eth.Contract(abi,BasTokenContract.address,option)
  }else{
    return new web3js.eth.Contract(abi,option)
  }
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

function connect(){

}

export default {
  checkMetaMask,
  connectMetamask,
  initConnectMetamask,
  listenerNetwork,
  getBasTokenInstance,
}

