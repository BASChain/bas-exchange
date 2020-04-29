import { winWeb3 } from '../index'
import {fromWei,toWei,BN} from 'web3-utils'

import { basTokenInstance } from "./index.js";
import { getEthBalance } from '../../bizlib/web3';

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

//export async get

export default {
  getTokenInst,
  getTokenBalance
};
