import { basAssetInstance } from './instances'
import { getWeb3, checkMetaMaskInject, currentChainId, currentWallet } from './index'
import { isSubdomain, getTopDomain} from '@/utils/domain-validator'
import { getInfuraWeb3, infuraWallet } from '@/bizlib/infura'

import { keccak256, hexToAscii } from 'web3-utils'
import { bytesToStr} from '@/utils'
import punycode from 'punycode'
import ErrCodes from './error-codes'

/**
 * only use for Search
 * @param {*} domain
 */
export async function searchDomain(domain){
  //default
  let chainId = 3 //currentChainId()
  let web3js = null;
  let wallet = ''
  if (checkMetaMaskInject()){
    web3js = getWeb3()
    chainId = currentChainId()
    wallet = currentWallet()
  }else{
    web3js = await getInfuraWeb3(chainId)
    wallet = infuraWallet
  }

  let inst = basAssetInstance(web3js,chainId,{from:wallet})
  let hash = keccak256(domain)

  let ret = await inst.methods.AssetDetailsByHash(hash).call()
  console.log(ret)
  let response = translateAssetDetails(ret,hash)

  if (isSubdomain(domain)){
    let topHash = keccak256(getTopDomain(domain))
    let topRet = await inst.methods.AssetDetailsByHash(topHash).call()

    let topRespData = translateAssetDetails(topRet,hash)

    if (topRet.name && topRespData.state) {
      response.topData = topRespData.data
    }
  }

  return response
}

function translateAssetDetails(ret,hash){
  if (!ret || !ret.name || !bytesToStr(ret.name,hash)){
    return {
      data:{
        signedDomain: hash||''
      },
      state:0
    }
  }else{
    return {
      state:1,
      data:{
        signedDomain: hash || '',
        name:ret.name,
        owner:ret.owner,
        expire:ret.expire,
        isRoot:ret.isRoot,
        openApplied:ret.r_openToPublic,
        isCustomed:ret.r_isCustomed,
        isPureA:ret.r_isPureA,
        customPrice:ret.r_customPrice,
        rootHash:ret.s_rootHash
      }
    }
  }
}

/**
 * infura or metamask
 * @param {string} domain
 * @return {
 *  state : 0,
 *  data:{}
 *  refData:{}
 * }
 */
export async function findDomainDetail(domain){
  let chainId = 3 //currentChainId()
  let web3js = null;
  let wallet = ''
  if (checkMetaMaskInject()) {
    web3js = getWeb3()
    chainId = currentChainId()
    wallet = currentWallet()
  } else {
    web3js = await getInfuraWeb3(chainId)
    wallet = infuraWallet
  }

  let inst = basAssetInstance(web3js, chainId, { from: wallet })
  let hash = keccak256(domain)
  let ret = await inst.methods.AssetDetailsByHash(hash).call()
  const resp = {
    state:0,
    data:{},
    dns:{}
  }

  let transRet = translateAssetDetails(ret,hash)

  if(transRet.state){
    resp.state = 1;
    resp.data = transRet.data;
    let dnsRet = await inst.methods.DnsDetailsByHash(hash).call()
    resp.dns = translateDNS(dnsRet)
  }
  return resp
}

/**
 * Validate Web3 chainId
 */
export function getBasAssetInstance(){
  let web3js = getWeb3()
  let chainId = currentChainId()
  let wallet = currentWallet()
  let inst = basAssetInstance(web3js, chainId, { from: wallet })
  return inst
}

/**
 * Use MetaMask
 * @param {string} handleText
 *    handle trim tolowercase punycode string
 */
export async function getDomainDetails(handleText) {
  console.log(handleText)
  let web3js = getWeb3()
  let chainId = currentChainId()
  let wallet = currentWallet()
  let inst = basAssetInstance(web3js, chainId, { from: wallet })
  let hash = keccak256(handleText)
  let ret = await inst.methods.AssetDetailsByHash(hash).call()
  const resp = {
    state: 0,
    data: {
      signedDomain:hash
    },
    dns: {
      name:'',
      ipv4:'',
      ipv6:'',
      wallet:'',
      alias:'',
      extension:''
    }
  }

  let transRet = translateAssetDetails(ret,hash)

  if (transRet.state) {
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
  if (!ret || !(ret.name)){
    return dns;
  }
  dns.name = ret.name
  dns.ipv4 = ret.ipv4
  dns.ipv6 = ret.ipv6
  dns.wallet = ret.bcAddr
  dns.alias = ret.aName
  dns.extension = ret.opData
  return dns;
}

/**
 * close
 * @param {*} domain
 */
export async function closeOpenApplied(domain){
  let chainId = currentChainId()
  let wallet = currentWallet()
  let web3js = getWeb3()

  let inst = basAssetInstance(web3js, chainId, { from: wallet })
  let hash = keccak256(domain)

  let qret = inst.methods.AssetDetailsByHash(hash).call();
  if (qret.r_openToPublic) throw ErrCodes.E7009
  await inst.methods.closeToPublic(hash).send({from:wallet})
}

/**
 *
 * @param {string} domain
 */
export async function openOpenApplied(domain) {
  let chainId = currentChainId()
  let wallet = currentWallet()
  let web3js = getWeb3()

  let inst = basAssetInstance(web3js, chainId, { from: wallet })
  let hash = keccak256(domain)

  let qret = inst.methods.AssetDetailsByHash(hash).call();
  if (!qret.r_openToPublic) throw ErrCodes.E7009
  await inst.methods.openToPublic(hash).send({ from: wallet })
}

/**
 *
 * @param {*} namehash
 * @param {*} to
 * @param {*} wallet
 */
export function transferDomainEmitter(to, namehash, wallet) {
  let web3js = getWeb3()
  let chainId = currentChainId()
  if (!wallet) wallet = currentWallet()
  let inst = basAssetInstance(web3js, chainId, { from: wallet })
  return inst.methods.transfer(to, namehash).send({ from: wallet })
}

export default {

}

