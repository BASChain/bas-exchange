import { winWeb3 } from "../index";

import * as ApiErrors from '../api-errors.js'

import { parseHexDomain } from '../utils'

import { basTraOwnershipInstance, basViewInstance } from './index'

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getAssetHashPager(chainId, wallet){
  if (!wallet) throw ApiErrors.PARAM_ILLEGAL
  const web3js = winWeb3()
  const inst = basTraOwnershipInstance(web3js, chainId, { from: wallet })

  const total = await inst.methods.assetsCountsOf().call()

  let pager = {
    total:0,
    hashes:[],
    assets:[]
  }
  if (total === 0) return pager
  pager.total = total;

  const hashes = await inst.methods.assetsOf(0,total-1).call()
  pager.hashes = hashes

  const viewInst = basViewInstance(web3js, chainId, { from: wallet })

  let assets = []
  for(let i = 0;i<hashes.length;i++){
    const hash = hashes[i]

    const ret = await viewInst.methods.queryDomainInfo(hash).call()

    if(!ret.name||!ret.expiration)continue;

    let asset = transAsset(ret, hash, chainId)
    assets.push(asset)
    //assets.push(asset)
  }

  pager.assets = assets

  return pager


  function transAsset(ret,hash,chainId){
    let domaintext = parseHexDomain(ret.name)
    let info = {
      "hash":hash,
      "chainId":chainId,
      name:ret.name,
      "domaintext": domaintext,
      owner:ret.owner,
      expire:ret.expiration,
      isRoot:Boolean(ret.isRoot),
      isRare:Boolean(ret.rIsRare),
      openApplied: Boolean(ret.rIsOpen),
      isCustomed:Boolean(ret.rIsCustomed),
      customPrice:ret.rCusPrice,
      roothash:ret.sRootHash,
      isOrder: Boolean(ret.MarketOrder)
    }
    return info
  }
}

export async function getMyAssets(owsInst,viewInst){
  if(!owsInst ||!viewInst)throw 'no instances.'
  const total = await owsInst.methods.assetsCountsOf().call()

  let pager = {
    total: 0,
    hashes: [],
    assets: []
  }
  if (total === 0) return pager

  pager.total = total

  const hashes = await owsInst.methods.assetsOf(0, total - 1).call()
  pager.hashes = hashes

  // let assets = []
  // for (let i = 0; i < hashes.length; i++) {
  //   const hash = hashes[i]
  //   const ret = await viewInst.methods.queryDomainInfo(hash).call()
  //   if (!ret.name || !ret.expiration) continue;

  //   const asset = transAsset(ret)
  //   assets.push(asset)
  // }

  // pager.assets = assets

  return pager

  function transAsset(ret, hash, chainId) {
    const domaintext = parseHexDomain(ret.name)
    const info = {
      hash,
      chainId,
      name: ret.name,
      domaintext,
      owner: ret.owner,
      expire: ret.expiration,
      isRoot: Boolean(ret.isRoot),
      isRare: Boolean(ret.rIsRare),
      openApplied: Boolean(ret.rIsOpen),
      isCustomed: Boolean(ret.rIsCustomed),
      customPrice: ret.rCusPrice,
      roothash: ret.sRootHash,
      isOrder: Boolean(ret.MarketOrder)
    }
  }

}

async function getAssetTotal(chainId,wallet){
  if(!wallet)throw ApiErrors.PARAM_ILLEGAL

  const web3js = winWeb3()
  const inst = basTraOwnershipInstance(web3js,chainId,{from:wallet})
  const total = await inst.methods.assetsCountsOf().call()

  return total;
}

export default {
  getAssetHashPager,
  getMyAssets
}
