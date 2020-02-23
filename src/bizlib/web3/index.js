import Web3 from 'web3'
import store from '@/store'
import apiTypes from '@/store/modules/web3/mutation-types'

// export function checkMetaMask(){
//   const flag = !!(window.web3 && window.ethereum && window.ethereum.isMetaMask)
//  return {
//     isInjected:flag
//   }
// }

export const checkMetaMask = new Promise((resolve,reject)=>{
  if(window.web3 === undefined){
    reject(new Error('Metamask unfound in your browser'))
  }
  window.ethereum.autoRefreshOnNetworkChange = false;
  let flag = !!(window.web3 && window.ethereum && window.ethereum.isMetaMask)
  let web3js = window.web3;
  var web3 = new Web3(web3js.currentProvider)
  resolve({
    isInjected:flag,
    web3(){
      return web3
    }
  })
})

export async function connectMetamask(){
  let ethereum = window.ethereum
  let accounts = await ethereum.enable()
  let wallet = accounts[0];
  let web3js = new Web3(window.web3.currentProvider)
  let chainId = await web3js.eth.getChainId()
  var bal = await web3js.eth.getBalance(wallet);
  return {
    chainId,
    wallet,
    ethBal:bal
  }
}

/**
 *
 * @param {*} wallet
 */
export function listenerNetwork(wallet){
  let ethereum = window.ethereum
  let web3js = new Web3(window.web3.currentProvider)

  ethereum.on('accountsChanged',function(accounts){
    if(accounts.length){
      store.commit(`web3/${apiTypes.UPDATE_WALLET}`,accounts[0])
      web3js.eth.getBalance(accounts[0]).then(bal =>{
        store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`,bal)
      })
    }else{
      store.commit(`web3/${apiTypes.UPDATE_WALLET}`,'')
    }
  })

  /**
   * MetaMask team so shit ,Introduction of their official API,
   * the new API is tells
   * networkChanged now feature will chainChanged
   */
  ethereum.on('networkChanged',function(chainId){
    console.log('Chain change',chainId)
    store.commit(`web3/${apiTypes.UPDATE_CHAINID}`,chainId)
    web3js.eth.getBalance(wallet).then(bal =>{
      store.commit(`web3/${apiTypes.UPDATE_ETHBAL}`,bal)
    })
  })
}

function connect(){
  const ethereum = window.ethereum
  return new Promise((resolve,reject)=>{

  })
}

export default {
  checkMetaMask,
  connectMetamask,
  listenerNetwork,
}

