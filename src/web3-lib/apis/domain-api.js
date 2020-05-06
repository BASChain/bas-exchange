import { winWeb3 } from "../index";
import { keccak256,BN } from "web3-utils";

import { basTokenInstance,basRootDomainInstance, basSubDomainInstance } from "./index";
import { MinGasWei,compareWei2Wei, prehandleDomain } from "@/utils";
import BizErrors from '@/utils/biz-codes.js'


import * as ApiErrors from '../error-codes.js'

/**
 * name required trim>toLowerCase>punycode
 * @param {string} name
 * @param {*} chainId
 */
async function rootHasTaken(name,chainId){
  const web3js = winWeb3();
  const inst = basRootDomainInstance(web3js,chainId);

  return await inst.methods.hasDomain(keccak256(name)).call();
}

/**
 * name required trim>toLowerCase>punycode
 * @param {*} name
 * @param {*} chainId
 * @param {*} isRoot
 */
async function hasTaken(name,chainId,isRoot) {
  const web3js = winWeb3();
  const hash = keccak256(name);
  const inst = isRoot ? basRootDomainInstance(web3js,chainId) : basSubDomainInstance(web3js,chainId);
  return await inst.methods.hasDomain(hash).call();
}


/**
 * return Object
 * @param {*} param
 * @param {*} chainId
 * @param {*} wallet
 */
async function preCheckForRoot(param = {
  nametext,
  years,
  openApplied,
  isCustomed,
  customWei,
  costWei
},chainId,wallet){

  const web3js = winWeb3();

  const token = basTokenInstance(web3js,chainId,{from:wallet});

  const name = prehandleDomain(nametext)
  const hash = keccak256(name)

  //balance
  const ethwei = await web3js.eth.getBalance(wallet);
  const baswei = await token.methods.balanceOf(wallet).call()

  //check eth
  if(compareWei2Wei(ethwei,MinGasWei) <= 0 ) throw ApiErrors.LACK_OF_ETH

  if(compareWei2Wei(baswei,costWei) <= 0 ) throw ApiErrors.LACK_OF_TOKEN

  //
  const rootInst = basRootDomainInstance(web3js,chainId);

  const exist = await rootInst.methods.hasDomain(hash).call();
  if(exist)throw BizErrors.DOMAIN_HAS_TAKEN

  return {
    nametext,
    name,
    hash
  }
}


export default {
  rootHasTaken,
  hasTaken,
};


