import { basTokenInstance } from './instances'
import { getWeb3, currentChainId, currentWallet } from './index'
import * as ErrCodes from './error-codes'
import { checkSupport } from '../networks'


export async function refreshAccount(){
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let accounts = await web3js.eth.getAccounts();

  if(!accounts.length) throw ErrCodes.E4001
  let wallet = accounts[0]

  const resp = {
    chainId,
    wallet,
    ethBal:"",
    basBal:""
  }

  resp.ethBal = await web3js.eth.getBalance(wallet)

  if (checkSupport(chainId)){
    let token = basTokenInstance(web3js, chainId, { from: wallet })
    let basBal = await token.methods.balanceOf(wallet).call()
    resp.basBal = basBal
  }else{
    resp.basBal=''
  }
  return resp
}

/**
 * update Balance
 */
export async function getNewBalance(){
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let accounts = await web3js.eth.getAccounts();
  if(!accounts.length)return;
  let wallet = accounts[0]
  let resp = {
    ethBal:0,
    absBal:0
  }
  resp.ethBal = await web3js.eth.getBalance(wallet)

  if (checkSupport(chainId)) {
    let token = basTokenInstance(web3js, chainId, { from: wallet })
    let basBal = await token.methods.balanceOf(wallet).call()
    resp.basBal = basBal
  } else {
    resp.basBal = 0
  }

  return resp;
}

/**
 *
 * @param {*} web3js
 */
export async function refreshPageInitial(web3js){

  let resp = {
    chainId:null,
    wallet:null,
    ethBal: ""
  }
  if (!web3js || !window.ethereum || !window.ethereum.isMetaMask){
    return resp;
  }
  let unLock = await window.ethereum._metamask.isUnlocked()
  if (unLock){
    let chainId = await web3js.eth.getChainId();
    resp.chainId = chainId;
    let accounts = await web3js.eth.getAccounts();
    console.log(accounts)
    if (accounts.length){
      let wallet = accounts[0]
      resp.wallet =wallet;
      resp.ethBal = await web3js.eth.getBalance(wallet)
      if (checkSupport(chainId)) {
        let token = basTokenInstance(web3js, chainId, { from: wallet })
        let basBal = await token.methods.balanceOf(wallet).call()
        resp.basBal = basBal
      } else {
        resp.basBal = 0
      }
    }else{
      resp.wallet = null
    }
  }

  return resp;
}

function validWebVersion(ver) {
  let minVer = 100;
  let maxVer = 200;
  let currVer = ver.match(/\d/g).filter((n, i) => i < 3).join('')
  let currVerNum = parseInt(currVer)
  return currVerNum >= minVer && currVerNum < maxVer
}

/**
 *
 */
export async function getBasTokenInstance(wallet){
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let token = basTokenInstance(web3js, chainId, { from: wallet })

  return token;
}


export default {
  refreshAccount
}
