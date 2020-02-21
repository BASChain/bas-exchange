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

function connect(){
  const ethereum = window.ethereum
  return new Promise((resolve,reject)=>{

  })
}

export default {
  checkMetaMask,
  connectMetamask,
}

