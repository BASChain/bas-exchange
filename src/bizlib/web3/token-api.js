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
export async function getDappBase(web3js){
  let resp = {
    chainId,
    wallet,
    ethBal: ""
  }
  if(!web3js){
    return resp;
  }
  let chainId = await web3js.eth.getChainId();
  let accounts = await web3js.eth.getAccounts();
  let wallet = accounts.length ? accounts[0] : ''


  resp.ethBal = await web3js.eth.getBalance(wallet)
  return resp;
}


export default {
  refreshAccount
}
