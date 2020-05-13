
import { getInfuraWeb3 } from '../infura'

import ApiErrors from '../api-errors.js'


import { checkSupport } from '@/bizlib/networks'

import {basViewInstance} from "./index";

/**
 * this get from server
 * @param {*} chainId
 */
export async function loadDappConfProps() {
  const web3js = getInfuraWeb3();
  let chainId = await web3js.eth.getChainId();

  //this.
  if (!checkSupport(chainId))chainId = 3

  //throw ApiErrors.UNSUPPORT_NETWORK

  const inst = basViewInstance(web3js,chainId,{});

  const res = await inst.methods.getOANNParams().call()
  console.log(res)

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

export const DomainConfTypes = {
  ipv4:"A",
  ipv6:"AAAA",
  mailExchange:"MX",
  blockChain:"BlockChain",
  iota:"IOTA",
  canonicalName:"CName",
  mxbca:"MXBCA",
  extrainfo:"Optional"
}

export const ConfDataDelimiter = ','

export default {
  loadDappConfProps,
  DomainConfTypes,
  ConfDataDelimiter
};
