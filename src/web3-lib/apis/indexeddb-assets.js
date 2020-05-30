import { getInfuraWeb3 } from '../infura'

import apiErrors, * as ApiErrors from '../api-errors.js'
import { checkSupport } from "../networks";

import {
  basRootDomainInstance,
  basSubDomainInstance,
  basViewInstance,
} from "./index";

import { parseHexDomain } from '../utils'

/**
 *
 * @param {*} chainId
 */
export async function getLatestRootDomains(chainId){
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK

  const web3js = getInfuraWeb3(chainId)
  const rootInst = basRootDomainInstance(web3js,chainId)

  const view = basViewInstance(web3js,chainId)

  let rootPromise = await (async () => {
    let rootEvents = await rootInst.getPastEvents('NewRootDomain',{
      fromBlock: 0, toBlock: "latest"
    });
    rootEvents = rootEvents.reverse().filter((it, idx) => idx < 10)

    // return rootEvents.map( d =>{
    //   const hash = d.returnValues.nameHash
    //   console.log(hash)
    //   return view.methods.queryDomainInfo(hash).call()
    // })
    return rootEvents
  })();


  let latest10 = await Promise.all(rootPromise)
  //console.log("latest10", latest10)
  return latest10.map( d =>{
    const res = d.returnValues
    return {
      name: res.rootName,
      domaintext: parseHexDomain(res.rootName),
      hash:res.nameHash,
      customPrice: res.customPrice,
      isCustomed: Boolean(res.isCustom),
      openApplied: Boolean(res.openToPublic),
    }
  })
}

export async function getLatestSubDomains(chainId){
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK

  const web3js = getInfuraWeb3(chainId)
  const subInst = basSubDomainInstance(web3js, chainId)

  const view = basViewInstance(web3js, chainId)

  let subPromise = await (async ()=>{
    let subEvents = await subInst.getPastEvents('NewSubDomain',{
      fromBlock: 0, toBlock: "latest"
    })

    subEvents = subEvents.reverse().filter((it,idx) => idx < 10 )

    return subEvents
  })();

  let latest10 = await Promise.all(subPromise)

  return latest10.map( d => {
    const res = d.returnValues
    return {
      hash:res.nameHash,
      roothash:res.rootHash,
      name:res.totalName,
      domaintext: parseHexDomain(res.totalName)
    }
  })
}

export default {
  getLatestRootDomains,
  getLatestSubDomains
}
