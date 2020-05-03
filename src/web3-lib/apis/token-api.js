import { winWeb3 } from '../index'
import { checkSupport } from '@/bizlib/networks'
import {fromWei,toWei,BN} from 'web3-utils'

import { basTokenInstance } from "./index.js";


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

//export async get

export default {
  getTokenInst,
  getTokenBalance,
  getBalances,
}
