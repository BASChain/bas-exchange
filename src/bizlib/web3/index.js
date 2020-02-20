import Web3 from 'web3'

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
  const flag = !!(window.web3 && window.ethereum && window.ethereum.isMetaMask)
  const web3js = window.web3;
  var web3 = new Web3(web3js.currentProvider)
  resolve({
    isInjected:flag,
    web3(){
      return web3
    }
  })
})

export async function connectMetamask(){
  const ethereum = window.ethereum
  const accounts = await ethereum.enable()
  const wallet = accounts[0];
  const web3js = new Web3(window.web3.currentProvider)
  const chainId = await web3js.eth.getChainId()
  var bal = await web3js.eth.getBalance(wallet);

  return {
    chainId,
    wallet,
    ethBal:bal
  }
}

function connect(){
  const ethereum = window.ethereum
  return new Promise((resolve,reject)=>{

  })
}

export default {
  checkMetaMask,
  connectMetamask,
}

