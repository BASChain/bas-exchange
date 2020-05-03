import { winWeb3 } from "../index";
import ErrorCodes from '../error-codes'

import { checkSupport } from '@/bizlib/networks'

import {basViewInstance} from "./index";

/**
 *
 * @param {*} chainId
 */
export async function loadDappConfProps() {
  const web3js = winWeb3();
  const chainId = await web3js.eth.getChainId();
  if(!checkSupport(chainId))throw ErrorCodes.UNSUPPORT_NETWORK

  const inst = basViewInstance(web3js,chainId,{});

  const res = await inst.methods.getOANNParams().call()

  return translateDappConfProps(res);
}

/**
 *
 * @param object {
 *  MAX_YEAR,AROOT_GAS,BROOT_GAS,
 *  SUB_GAS,CUSTOMED_PRICE_GAS,
 * } res
 */
function translateDappConfProps(res){
  let o = {
    rareGas: res.AROOT_GAS || null,
    rootGas: res.BROOT_GAS || null,
    subGas: res.SUB_GAS || null,
    externalGas: res.CUSTOMED_PRICE_GAS || null,
    maxRegYears: res.MAX_YEAR
  };

  return o
}

export default {
  loadDappConfProps,
};
