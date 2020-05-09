import { winWeb3 } from "../index";
import { keccak256, hexToString,BN } from "web3-utils";

import {
  basRootDomainInstance,
  basSubDomainInstance,
  basViewInstance,
} from "./index";

import { prehandleDomain } from "../utils";

//import * as ApiErrors from '../api-errors.js'


/**
 * name required trim>toLowerCase>punycode
 * @param {*} name
 * @param {*} chainId
 * @param {*} isRoot
 */
export async function hasTaken(name,chainId,isRoot) {
  const web3js = winWeb3();
  const handleText = prehandleDomain(name)
  const hash = keccak256(handleText);
  const inst = isRoot ? basRootDomainInstance(web3js,chainId) : basSubDomainInstance(web3js,chainId);
  return await inst.methods.hasDomain(hash).call();
}

/**
 * name required trim>toLowerCase>punycode
 * @param {string} name
 * @param {*} chainId
 */
async function rootHasTaken(name,chainId){
  const handleText = prehandleDomain(name)
  const web3js = winWeb3();
  const inst = basRootDomainInstance(web3js,chainId);

  return await inst.methods.hasDomain(keccak256(handleText)).call();
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
  //console.log(name,hash,chainId);
  const viewInst = basViewInstance(web3js, chainId);
  //console.log('>>>>>>>View Address>>>>>>>>>',viewInst._address)

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
    openApplied:res.rIsOpen,
    isCustomed: res.rIsCustomed,
    customPrice:res.rCusPrice,
    expire:res.expiration,
    israre: res.rIsRare,
    isOrder:res.isMarketOrder
  };

  return Object.assign({},resp,{state:1,assetinfo:assetinfo})
}



export default {
  hasTaken,
  rootHasTaken,
  findDomainInfo,
};


