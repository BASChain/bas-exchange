import { basTokenInstance, basMinerInstance} from './instances'
import ContractHelper from '../abi-manager'
import { getWeb3 } from './index'
import * as ErrCodes from './error-codes'
import { checkSupport } from '../networks'
import store from '@/store'


export async function refreshAccount(){
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let accounts = await web3js.eth.getAccounts();

  if(!accounts.length) throw ErrCodes.E4001
  let wallet = accounts[0]

  const resp = {
    chainId,
    wallet,
    ethBal:0,
    basBal:0,
    drawWei:0
  }

  resp.ethBal = await web3js.eth.getBalance(wallet)

  if (checkSupport(chainId)){
    let token = basTokenInstance(web3js, chainId, { from: wallet })
    let basBal = await token.methods.balanceOf(wallet).call()
    resp.basBal = basBal
    const miner = basMinerInstance(web3js, chainId, { from: wallet })
    let drawWei = await miner.methods.balanceOf(wallet).call()
    resp.drawWei = drawWei
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
    basBal:0
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
/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export  function tokenInstance(chainId,wallet) {
  let web3js = getWeb3()
  let token = basTokenInstance(web3js, chainId, { from: wallet })
  return token;
}

/**
 * 获取余额,并更新State
 * throw :
 *  E4999 no wallet
 *  E9997 web3 not injected
 *  E9998 no ethereum
 */
export async function getBalances(){
  let web3js = getWeb3()
  let chainId = await web3js.eth.getChainId();
  let accounts = await web3js.eth.getAccounts();
  if(!accounts || !accounts.length)throw ErrCodes.E4999
  let wallet = accounts[0]

  const ret = {
    chainId,
    wallet,
    ethBal:0,
    basBal:0
  }

  ret.ethBal = await web3js.eth.getBalance(wallet)
  if (checkSupport(chainId)) {
    let token = basTokenInstance(web3js, chainId, { from: wallet })
    let basBal = await token.methods.balanceOf(wallet).call()
    ret.basBal = basBal
  } else {
    ret.basBal = 0
  }
  store.commit('web3/refreshAccBase',ret)
  return ret;
}

/**
 * @commonet :newsol
 * @param {*} chainId
 * @param {*} wallet
 * @param {*} costWei
 */
export function approveBasTokenEmitter(chainId,wallet,costWei){
  let web3js = getWeb3()
  let token = basTokenInstance(web3js, chainId, { from: wallet })
  let oannAddress = ContractHelper.BasOANN(chainId).address;

  return token.methods.approve(oannAddress, costWei+'').send({from:wallet})
}

/**
 * 校验余额充足
 * @param {*} chainId
 * @param {*} wallet
 * @param {*} costBAS
 */
export async function checkBalance(chainId,wallet,costBAS) {
  let web3js = getWeb3()
  let token = basTokenInstance(web3js, chainId, { from: wallet })
  const ethWei = await web3js.eth.getBalance(wallet);
  const basWei = await token.methods.balanceOf(wallet).call()
  console.log('Balances',ethWei,basWei)

  if (parseFloat(web3js.utils.fromWei(ethWei)) <= 0.0) throw ErrCodes.E1002
  if (parseFloat(web3js.utils.fromWei(basWei)) - costBAS < 0.0)  throw ErrCodes.E1003

  return {
    ethWei,
    basWei,
  }
}

/**
 *
 * @param {*} param0
 */
export function approveToMarketEmitter({
  costWei,owner,chainId,wallet,
}) {
  let web3js = getWeb3()
  let approveAddress = ContractHelper.BasMarket(chainId||3).address
  console.log(approveAddress, costWei)
  let token = basTokenInstance(web3js, chainId, { from: wallet })
  return token.methods.approve(approveAddress, costWei+'').send({ from: wallet })
}

export default {
  refreshAccount,
  getBalances,
  approveToMarketEmitter
}
