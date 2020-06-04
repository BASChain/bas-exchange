import { winWeb3 } from "../index";
import { getInfuraWeb3 } from '../infura'

import {
  basRootDomainInstance,
  basSubDomainInstance,
  basDomainConfInstance,
  basViewInstance,
} from "./index";

import { DomainConfTypes } from './domain-conf-api'

import {
  prehandleDomain, notNullHash,
  parseHexDomain, hex2confDataStr,
  hex2ConfDatas,
  isRare, assertNullAddress,
} from "../utils";

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
  const hash = Web3.utils.keccak256(handleText);
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

  return await inst.methods.hasDomain(Web3.utils.keccak256(handleText)).call();
}

/**
 *
 * @param {*} domaintext
 * @param {*} chainId
 */
export async function findDomainInfo(domaintext, chainId) {
  const web3js = getInfuraWeb3(chainId)
  if (!domaintext || domaintext.indexOf(".") >= 0) throw "Illegal domaintext.";
  const name = prehandleDomain(domaintext);

  const hash = Web3.utils.keccak256(name);

  const viewInst = basViewInstance(web3js, chainId);

  const res = await viewInst.methods.queryDomainInfo(hash).call();

  return transRootDomain(res, { hash,domaintext});
}


function transRootDomain(res,{hash,domaintext}){
  let resp = {
    state:0
  }
  if (!res || !res.name || assertNullAddress(res.owner) ) return resp;

  const assetinfo = {
    name: Web3.utils.hexToString(res.name),
    hash,
    domaintext,
    owner:res.owner,
    isRoot:Boolean(res.isRoot),
    openApplied:Boolean(res.rIsOpen),
    isCustomed: Boolean(res.rIsCustom),
    customPrice:res.rCusPrice,
    expire:res.expiration,
    israre: Boolean(res.rIsRare),
    isOrder:Boolean(res.isMarketOrder)
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
  const web3js = getInfuraWeb3(chainId);

  const domain = prehandleDomain(name)
  const hash = await Web3.utils.keccak256(domain)
  const viewInst = basViewInstance(web3js,chainId)
  const confInst = basDomainConfInstance(web3js,chainId)

  const res = await viewInst.methods.queryDomainInfo(hash).call();
  //console.log('getDomainDetail>>>Res>>>>>', res,res.name)
  const resp = {
    state:0,
    assetinfo:null,
    rootasset:null,
    refdata:null
  }

  console.log(typeof res.expiration, res.expiration)

  if (!res.name || assertNullAddress(res.owner))return resp;

  const isRoot = Boolean(res.isRoot)
  const assetinfo = {
    name: res.name,
    domaintext: parseHexDomain(res.name),
    hash:hash,
    owner: res.owner,
    isRoot: isRoot,
    openApplied: Boolean(res.rIsOpen),
    isCustomed: Boolean(res.rIsCustom),
    customPrice: res.rCusPrice,
    expire: res.expiration,
    isRare: res.rIsRare,
    isOrder: res.isMarketOrder,
    roothash: res.sRootHash
  }

  resp.state = 1
  resp.assetinfo = assetinfo

  //refdata
  const refRet = await viewInst.methods.queryDomainConfigs(hash).call()

  const extraRet = await confInst.methods.domainConfData(hash, DomainConfTypes.extrainfo).call()
  console.log(">>>>", refRet, hex2confDataStr(refRet.A))
  resp.refdata = {
    A: hex2confDataStr(refRet.A),
    AAAA: hex2confDataStr(refRet.AAAA),
    MX: hex2confDataStr(refRet.MX ),
    BlockChain: hex2confDataStr(refRet.BlockChain ),
    IOTA: hex2confDataStr(refRet.IOTA ),
    CName: hex2confDataStr(refRet.CName ),
    MXBCA: hex2confDataStr(refRet.MXBCA ),
    Optional: hex2confDataStr(extraRet ? extraRet+'' :'0x')
  }


  if (!isRoot && notNullHash(res.sRootHash)){
    const topres = await viewInst.methods.queryDomainInfo(res.sRootHash).call();
    const toptext = parseHexDomain(topres.name)
    const rootasset = {
      name: toptext,
      domaintext: toptext,
      hash: res.sRootHash,
      owner: topres.owner,
      isRoot: Boolean(topres.isRoot),
      openApplied: Boolean(topres.rIsOpen),
      isCustomed: Boolean(topres.rIsCustom),
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

export async function getRootDomains(chainId){
  const web3js = getInfuraWeb3(chainId);
  const rootInst = basRootDomainInstance(web3js,chainId)

  let namesPromise = await (async() =>{
    let openList = await rootInst.getPastEvents('RootPublicChanged',{
      fromBlock: 0, toBlock: "latest"
    })
    //console.log(openList)

    return openList.map( d =>{
      return rootInst.getPastEvents("NewRootDomain",{
        fromBlock: 0, toBlock: "latest",
        filter: { nameHash: d.returnValues.nameHash }
      })
    })
  })();
  let namesResult = await Promise.all(namesPromise)

  let ko = {}
  let showNames = namesResult.reduce((cur, next) => {

    ko[next[0].returnValues.nameHash] ? "" : ko[next[0].returnValues.nameHash] = true && cur.push(next)
    //cur.push(next)
    return cur
    }, []).map((x) => {

    return  {
      domaintext: parseHexDomain(x[0].returnValues.rootName),
      name: Web3.utils.hexToString(x[0].returnValues.rootName),
      openApplied: Boolean(x[0].returnValues.openToPublic),
      isCustomed: Boolean(x[0].returnValues.isCustom),
      hash: x[0].returnValues.nameHash,
      customPrice: x[0].returnValues.customPrice
    }
    //return [parseHexDomain(x[0].returnValues.rootName), x[0].returnValues.openToPublic]
  })
  //console.log("rootDomains>>>>>>>",showNames)
  return showNames.filter(r => r.openApplied && isRare(r.domaintext))
}

export async function getDomainBCADatas(domaintext,chainId) {
  const web3js = getInfuraWeb3(chainId);

  const hash = Web3.utils.keccak256(prehandleDomain(domaintext))
  const confInst = basDomainConfInstance(web3js, chainId)
  const bcaRet = await confInst.methods.domainConfData(hash, DomainConfTypes.blockChain).call()

  return hex2ConfDatas(bcaRet||'0x')
}

export default {
  hasTaken,
  rootHasTaken,
  findDomainInfo,
  getRootDomains,
};


