import { winWeb3 } from "../index";
import { getInfuraWeb3 } from '../infura'

import { keccak256, hexToString,BN } from "web3-utils";

import {
  basRootDomainInstance,
  basSubDomainInstance,
  basViewInstance,
} from "./index";

import { prehandleDomain, notNullHash } from "../utils";
import apiErrors from "../api-errors";

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

/**
 *
 * @param {*} name
 * @param {*} chainId
 */
export async function getDomainDetail(name,chainId){
  if(name===undefined)throw apiErrors.PARAM_ILLEGAL

  const domain = prehandleDomain(name)
  const hash = keccak256(domain)

  const web3js = getInfuraWeb3(chainId);
  const viewInst = basViewInstance(web3js,chainId)

  const res = await viewInst.methods.queryDomainInfo(hash).call();

  const resp = {
    state:0,
    assetinfo:null,
    rootasset:null,
    refdata:[]
  }

  if (!res.name)return resp;

  const isRoot = Boolean(res.isRoot)
  const assetinfo = {
    name: res.name,
    domaintext:name,
    hash:hash,
    owner: res.owner,
    isRoot: isRoot,
    openApplied: Boolean(res.rIsOpen),
    isCustomed: Boolean(res.rIsCustomed),
    customPrice: res.rCusPrice,
    expire: res.expiration,
    isRare: res.rIsRare,
    isOrder: res.isMarketOrder,
    roothash: res.sRootHash
  }

  resp.state = 1
  resp.assetinfo = assetinfo

  if (isSub && notNullHash(res.sRootHash)){
    const topres = await viewInst.methods.queryDomainInfo(res.sRootHash).call();
    const toptext = parseHexDomain(topres.name)
    const rootasset = {
      name: toptext,
      domaintext: toptext,
      hash: res.sRootHash,
      owner: topres.owner,
      isRoot: Boolean(topres.isRoot),
      openApplied: Boolean(topres.rIsOpen),
      isCustomed: Boolean(topres.rIsCustomed),
      customPrice: topres.rCusPrice,
      expire: topres.expiration,
      isRare: topres.rIsRare,
      isOrder: topres.isMarketOrder,
      roothash: topres.sRootHash
    }

    resp.rootasset = rootasset
  }

  return resp
}


export default {
  hasTaken,
  rootHasTaken,
  findDomainInfo,
};


