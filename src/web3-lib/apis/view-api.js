import { winWeb3 } from "../index";
import { getInfuraWeb3 } from '../infura'
import { keccak256, fromAscii, hexToString } from "web3-utils";

import {
  basRootDomainInstance,
  basMailManagerInstance,
  basViewInstance,
  basTokenInstance,
} from "./index";

import {
  prehandleDomain, parseHexDomain, notNullHash,
  assertNullParameter, assertNullAddress,
} from "../utils";

import * as ApiErrors from '../api-errors.js'
import { checkSupport } from "../networks";

export async function getRootDomains(chainId) {
  const web3js = getInfuraWeb3(chainId);
  const rootInst = basMailManagerInstance(web3js, chainId)

  let namesPromise = await (async () => {
    let openList = await rootInst.getPastEvents('RootPublicChanged', {
      fromBlock: 0, toBlock: "latest"
    })
    //console.log(openList)

    return openList.map(d => {
      return rootInst.getPastEvents("NewRootDomain", {
        fromBlock: 0, toBlock: "latest",
        filter: { nameHash: d.returnValues.nameHash }
      })
    })
  })();
  let namesResult = await Promise.all(namesPromise)

  let ko = {}
  let showNames = namesResult.reduce((cur, next) => {
    ko[next[0].returnValues.nameHash] ? "" : ko[next[0].returnValues.nameHash] = true && cur.push(next)
    return cur
  }, []).map((x) => {
    //console.log(x)
    return {
      domaintext: parseHexDomain(x[0].returnValues.rootName),
      name: hexToString(x[0].returnValues.rootName),
      openApplied: Boolean(x[0].returnValues.openToPublic),
      isCustomed: Boolean(x[0].returnValues.isCustom),
      hash: x[0].returnValues.nameHash,
      customPrice: x[0].returnValues.customPrice
    }
    //return [parseHexDomain(x[0].returnValues.rootName), x[0].returnValues.openToPublic]
  })
  return showNames.filter(r => r.openApplied && isRare(r.domaintext))
}

/**
 *
 * @param {*} chainId
 */
export async function publicMailDomains(chainId){
  const web3js = getInfuraWeb3(chainId);
  const rootInst = basRootDomainInstance(web3js, chainId)
  const mailManager = basMailManagerInstance(web3js, chainId)

  let namesPromise = await (async () => {
    let openList = await mailManager.getPastEvents('MailServerOpenChanged', {
      fromBlock: 0, toBlock: "latest",
      filters:{isOpen:true}
    })
    //console.log(openList)

    return openList.map(d => {
      return rootInst.getPastEvents("NewRootDomain", {
        fromBlock: 0, toBlock: "latest",
        filter: { nameHash: d.returnValues.domainHash }
      })
    })
  })();
  let namesResult = await Promise.all(namesPromise)

  //console.log(namesResult)
  let ko = {}
  let showNames = namesResult.reduce((cur, next) => {
    if (next.length){
      ko[next[0].returnValues.nameHash] ? "" : ko[next[0].returnValues.nameHash] = true && cur.push(next)
    }else{
      //console.log("next>>>>>>", next)
    }

    return cur
  }, []).map((x) => {
    //console.log(x)
    return {
      domaintext: parseHexDomain(x[0].returnValues.rootName),
      name: hexToString(x[0].returnValues.rootName),
      openApplied: Boolean(x[0].returnValues.openToPublic),
      isCustomed: Boolean(x[0].returnValues.isCustom),
      hash: x[0].returnValues.nameHash,
      customPrice: x[0].returnValues.customPrice
    }
    //return [parseHexDomain(x[0].returnValues.rootName), x[0].returnValues.openToPublic]
  })
  return showNames
}

export async function findMailInfo(fulltext,chainId){
  if (assertNullParameter(fulltext))throw ApiErrors.PARAM_ILLEGAL

  const web3js = getInfuraWeb3(chainId)
  chainId = await web3js.eth.getChainId()
  if(!checkSupport(chainId))throw ApiErrors.UNSUPPORT_NETWORK

  const view = basViewInstance(web3js,chainId,{});
  const hash = keccak256(fulltext)
  console.log("find mail by hash:",hash)
  const ret = await view.methods.queryEmailInfo(hash).call()

  const resp = {
    state:0,
    mail:null,
    domain:null
  }

  if (!ret.owner || assertNullAddress(ret.owner))return resp;

  const domainhash = ret.domainHash
  const domainRet = await view.methods.queryDomainInfo(domainhash).call()

  resp.state = 1
  resp.mail = {
    hash,
    domainhash,
    expiration:ret.expiration,
    owner:ret.owner,
    aliasName:hexToString(ret.aliasName),
    abandoned:Boolean(ret.isValid),
    bca:ret.bcAddress,
    domaintext: parseHexDomain(domainRet.name)
  }

  resp.domain = {
    hash:domainhash,
    domaintext: parseHexDomain(domainRet.name),
    expire:domainRet.expiration,
    owner:domainRet.owner
  }

  return resp
}

/**
 *
 * @param {*} hash
 * @param {*} chainId
 */
export async function getMailInfo(hash,chainId) {
  if (!hash) throw ApiErrors.PARAM_ILLEGAL

  const web3js = getInfuraWeb3(chainId)
  chainId = await web3js.eth.getChainId()
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const view = basViewInstance(web3js, chainId, {});
  console.log("find mail by hash:", hash)
  const ret = await view.methods.queryEmailInfo(hash).call()

  const resp = {
    state: 0,
    mail: null,
    domain: null
  }

  if (!ret.owner || assertNullAddress(ret.owner)) return resp;

  const domainhash = ret.domainHash
  const domainRet = await view.methods.queryDomainInfo(domainhash).call()

  resp.state = 1
  resp.mail = {
    hash,
    domainhash,
    expiration: ret.expiration,
    owner: ret.owner,
    aliasName: ret.aliasName ? hexToString(ret.aliasName):'',
    abandoned: Boolean(ret.isValid),
    bca: ret.bcAddress ? hexToString(ret.bcAddress) : '',
    domaintext: parseHexDomain(domainRet.name)
  }

  resp.domain = {
    hash: domainhash,
    domaintext: parseHexDomain(domainRet.name),
    expire: domainRet.expiration,
    owner: domainRet.owner
  }

  return resp
}



/**
 *
 * @param {*} text required
 * @param {*} chainId
 */
export async function findDomain4Search(text, chainId) {
  if (text === undefined || !text.length) throw apiErrors.PARAM_ILLEGAL
  const web3js = getInfuraWeb3(chainId);
  console.log('Chsi>>>', await web3js.eth.getChainId())
  const sname = prehandleDomain(text)
  const hash = await keccak256(sname)

  const viewInst = basViewInstance(web3js, chainId)
  const res = await viewInst.methods.queryDomainInfo(hash).call();
  console.log('getDomainDetail>>>Res>>>>>', hash, res, res.name)
  const resp = {
    state: 0,
    assetinfo: null,
    rootasset: null,
    registState: false
  }

  console.log(typeof res.expiration, res.expiration)

  if (!res.name || parseInt(res.expiration) === 0) return resp;
  const isRoot = Boolean(res.isRoot)
  resp.registState = true
  resp.state = 1
  resp.assetinfo = {
    name: hexToString(res.name),
    domaintext: parseHexDomain(res.name),
    hash: hash,
    owner: res.owner,
    isRoot: isRoot,
    openApplied: Boolean(res.rIsOpen),
    isCustomed: Boolean(res.rIsCustom),
    customPrice: res.rCusPrice,
    expire: res.expiration,
    isRare: Boolean(res.rIsRare),
    isOrder: Boolean(res.isMarketOrder),
    roothash: res.sRootHash
  }

  if (!isRoot && notNullHash(res.sRootHash)) {
    const rootRes = await viewInst.methods.queryDomainInfo(res.sRootHash).call();
    resp.rootasset = {
      name: hexToString(rootRes.name),
      domaintext: parseHexDomain(rootRes.name),
      hash: res.sRootHash,
      owner: rootRes.owner,
      isRoot: Boolean(rootRes.isRoot),
      openApplied: Boolean(rootRes.rIsOpen),
      isCustomed: Boolean(rootRes.rIsCustom),
      customPrice: rootRes.rCusPrice,
      expire: rootRes.expiration,
      isRare: Boolean(rootRes.rIsRare),
      isOrder: Boolean(rootRes.isMarketOrder),
      roothash: rootRes.sRootHash
    }
  }

  return resp
}

export default {
  publicMailDomains,
  findMailInfo,
}
