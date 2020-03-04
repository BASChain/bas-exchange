import { basAssetInstance } from './instances'
import { getWeb3, currentChainId, currentWallet } from './index'
import { isSubdomain, getTopDomain} from '@/utils/domain-validator'

import { keccak256, toHex, hexToString } from 'web3-utils'

export async function searchDomain(domain){
  let web3js = getWeb3()
  let chainId = currentChainId()
  let wallet = currentWallet()
  let inst = basAssetInstance(web3js,chainId,{from:wallet})
  let hash = keccak256(domain)

  let ret = await inst.methods.AssetDetailsByHash(hash).call()

  let response = translateAssetDetails(ret)

  if (isSubdomain(domain)){
    let topHash = keccak256(getTopDomain(domain))
    let topRet = await inst.methods.AssetDetailsByHash(topHash).call()

    let topRespData = translateAssetDetails(topRet)
    if (topRet.name && topRespData.state) {
      response.topData = topRespData.data
    }
  }

  return response
}

function translateAssetDetails(ret){
  if (!ret || !ret.name || !hexToString(ret.name)){
    return {
      data:{},
      state:0
    }
  }else{
    return {
      state:1,
      data:{
        name:ret.name,
        owner:ret.owner,
        expire:ret.expire,
        isRoot:ret.isRoot,
        openAllied:ret.r_openToPublic,
        isCustomed:ret.r_isCustomed,
        isPureA:ret.r_isPureA,
        customPrice:ret.r_customPrice,
        rootHash:ret.s_rootHash
      }
    }
  }
}

/**
 *
 * @param {string} domain
 * @return {
 *  state : 0,
 *  data:{}
 *  refData:{}
 * }
 */
export async function findDomainDetail(domain){
  let web3js = getWeb3()
  let chainId = currentChainId()
  let wallet = currentWallet()
  let inst = basAssetInstance(web3js, chainId, { from: wallet })
  let hash = keccak256(domain)
  let ret = await inst.methods.AssetDetailsByHash(hash).call()
  const resp = {
    state:0,
    data:{},
    dns:{}
  }

  let transRet = translateAssetDetails(ret)
  if(transRet.state){
    resp.state = 1;
    resp.data = transRet.data;
    let dnsRet = await inst.methods.DnsDetailsByHash(hash).call()
    resp.dns = translateDNS(dnsRet)
  }
  return resp
}

export function translateDNS(ret){
  let dns = {
    name:'',
    ipv4: '',
    ipv6:'',
    wallet:'',
    alias:'',
    extension:''
  }
  if(!ret || !hexToString(ret.name)){
    return dns;
  }
  dns.name = ret.name
  dns.ipv4 = ret.ipv4
  dns.ipv6 = ret.ipv6
  dns.wallet = ret.bcAddr
  dns.alias = ret.alias
  dns.extension = ret.opData
  return dns;
}

export default {

}

