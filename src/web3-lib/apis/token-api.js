import { winWeb3 } from '../index'
import { checkSupport } from '@/bizlib/networks'
import {fromWei,toWei,BN,isAddress} from 'web3-utils'

import { basTokenInstance } from "./index.js";
import apiErrors from '../api-errors';


/**
 *
 * @param {*} chainId required
 * @param {*} wallet required
 */
export function getTokenInst(chainId,wallet) {
  const web3js = winWeb3()
  return basTokenInstance(web3js,chainId,{from:wallet})
}

/**
 * return BN
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getTokenBalance(chainId,wallet){
  const inst = getTokenInst(chainId,wallet)
  return new BN(await inst.methods.balanceOf(wallet).call(),16)
}

/**
 * return {ethwei BN,baswei BN}
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getBalances(chainId,wallet) {

  const web3js = winWeb3();
  const ethwei = new BN(await web3js.eth.getBalance(wallet),16)

  let baswei = new BN(0x0,16);

  if(checkSupport(chainId)){
    const inst = getTokenInst(chainId, wallet);
    baswei = new BN(await inst.methods.balanceOf(wallet).call(), 16);
  }

  return {
    ethwei,
    baswei
  };
}

export function approveTokenEmitter(spender,costwei,chainId,wallet) {
  if (!isAddress(spender) || !costwei || !isAddress(wallet)){
    throw apiErrors.PARAM_ILLEGAL
  }
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()
  const token = basTokenInstance(web3js,chainId,{from:wallet})

  return token.methods.approve(spender,costwei).send({ from : wallet })
}

//export async get

export default {
  getTokenInst,
  getTokenBalance,
  getBalances,
  approveTokenEmitter,
}
