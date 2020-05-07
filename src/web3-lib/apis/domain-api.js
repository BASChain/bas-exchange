import { winWeb3 } from "../index";
import { keccak256, hexToString,BN } from "web3-utils";

import {
  basTokenInstance,
  basRootDomainInstance,
  basSubDomainInstance,
  basViewInstance,
} from "./index";

import { MinGasWei,compareWei2Wei, prehandleDomain } from "../utils";

import * as ApiErrors from '../api-errors.js'

/**
 * name required trim>toLowerCase>punycode
 * @param {*} name
 * @param {*} chainId
 * @param {*} isRoot
 */
export async function hasTaken(name,chainId,isRoot) {
  const web3js = winWeb3();
  const hash = keccak256(name);
  const inst = isRoot ? basRootDomainInstance(web3js,chainId) : basSubDomainInstance(web3js,chainId);
  return await inst.methods.hasDomain(hash).call();
}

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
 *
 * @param {*} domaintext
 * @param {*} chainId
 */
export async function findDomainInfo(domaintext, chainId) {
  const web3js = winWeb3();
  if (!domaintext || domaintext.indexOf(".") >= 0) throw "Illegal domaintext.";
  const name = prehandleDomain(domaintext);

  const hash = keccak256(name);
  const viewInst = basViewInstance(web3js, chainId);

  const res = await viewInst.methods.queryDomainInfo(hash).call();
  console.log(res)

  return transRootDomain(res, { hash,domaintext});
}

function transRootDomain(res,{hash,domaintext}){
  let resp = {
    state:0
  }
  if(!res || !res.name || !res.owner ) return resp;

  const assetinfo = {
    name: hexToString(res.name),
    hash,
    domaintext,
    owner:res.owner,
    isRoot:res.isRoot,
    openApplied:res.rlsOpen,
    isCustomed:res.rlsCustomed,
    customPrice:res.rCusPrice,
    expire:res.expiration,
    israre:res.rlsRare,
    isOrder:res.isMarketOrder
  };

  return Object.assign({},resp,{state:1,assetinfo:assetinfo})
}


/**
 * return Object
 * @param {*} param
 */
export async function preCheck4Root(
  domaintext,
  costWei,
  chainId,
  wallet
){
  console.log(domaintext, costWei, chainId,wallet)

  const web3js = winWeb3();

  const token = basTokenInstance(web3js,chainId,{from:wallet});

  const name = prehandleDomain(domaintext)
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
  if(exist)throw ApiErrors.DOMAIN_HAS_TAKEN

  return {
    domaintext,
    name,
    hash,
    ethwei,
    baswei
  }
}



export default {
  hasTaken,
  rootHasTaken,
  findDomainInfo,
  preCheck4Root,
};


