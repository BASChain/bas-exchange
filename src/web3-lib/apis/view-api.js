import { winWeb3 } from "../index";
import { getInfuraWeb3 } from '../infura'
import { keccak256, fromAscii, hexToString } from "web3-utils";

import {
  basRootDomainInstance,
  basMailManagerInstance,
  basViewInstance,
} from "./index";

import {
  MinGasWei, compareWei2Wei, prehandleDomain,
  parseHexDomain,
  assertNullParameter, assertNullAddress,
} from "../utils";

import * as ApiErrors from '../api-errors.js'
import SolCodes from './sol-codes'
import { checkSupport } from "../networks";

/**
 * return {
 *  costWei,
 *  hash
 * }
 * @param {*} domaintext
 * @param {*} isCustomed
 * @param {*} customWei
 * @param {*} years
 * @param {*} chainId
 * @param {*} wallet
 */
export async function preCheck4Root({
  domaintext,
  isCustomed,
  customWei,
  years,
  chainId,
  wallet,
}, costwei) {
  if (domaintext === undefined
    || !years || !chainId || !wallet) throw ApiErrors.PARAM_ILLEGAL

  const name = prehandleDomain(domaintext)
  const hash = keccak256(name)

  const web3js = winWeb3();
  let options = { from: wallet }

  const ethwei = await web3js.eth.getBalance(wallet);
  if (compareWei2Wei(ethwei, MinGasWei) <= 0) throw ApiErrors.LACK_OF_ETH

  //TODO

  return {
    costwei,
    hash,
  }

}

/**
 * 返回 合法的
 * {
 *  hash:fullhash,
 *  costwei:
 * }
 * @param {*} roottext
 * @param {*} subtext
 * @param {*} years
 * @param {*} chainId
 * @param {*} wallet
 */
export async function preCheck4Sub(
  roottext,
  subtext,
  years,
  chainId,
  wallet
) {
  if (roottext === undefined || subtext === undefined
    || !years || !chainId || !wallet) throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3();
  let options = {from:wallet}

  const ethwei = await web3js.eth.getBalance(wallet);
  if (compareWei2Wei(ethwei, MinGasWei) <= 0) throw ApiErrors.LACK_OF_ETH

  const view = basViewInstance(web3js,chainId,Object.assign({},options))

  const rootname = prehandleDomain(roottext);
  const subname = prehandleDomain(subtext);

  const hash = keccak256(`${subname}.${rootname}`)

  const rootbytes = fromAscii(rootname)
  const subbytes = fromAscii(subname)

  const checkResp = await view.methods.checkSubRegistry(rootbytes, subbytes, years).call()

  if (!checkResp ) throw ApiErrors.RPC_SERVER_ERROR

  switch (checkResp[0]) {
    case SolCodes.InvalidString:
      throw ApiErrors.DOMAIN_FORMAT_ILLEGAL;
    case SolCodes.DomainIsTaken:
      throw ApiErrors.DOMAIN_HAS_TAKEN;
    case SolCodes.InvalidExpiration:
      throw ApiErrors.DOMAIN_TOP_EXPIRED;
    case SolCodes.CustomedPriceBelowDefault:
      throw ApiErrors.LACK_OF_TOKEN
    default:
      break;
  }

  const costwei = checkResp[1]

  return {
    costwei,
    hash
  }
}


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
    console.log(openList)

    return openList.map(d => {
      return rootInst.getPastEvents("NewRootDomain", {
        fromBlock: 0, toBlock: "latest",
        filter: { nameHash: d.returnValues.domainHash }
      })
    })
  })();
  let namesResult = await Promise.all(namesPromise)

  console.log(namesResult)
  let ko = {}
  let showNames = namesResult.reduce((cur, next) => {
    if (next.length){
      ko[next[0].returnValues.nameHash] ? "" : ko[next[0].returnValues.nameHash] = true && cur.push(next)
    }else{
      console.log("next>>>>>>", next)
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
    bca: ret.bcAddress,
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


export default {
  preCheck4Root,
  preCheck4Sub,
  publicMailDomains,
  findMailInfo,
}
