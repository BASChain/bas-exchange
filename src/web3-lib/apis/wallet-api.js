import { winWeb3 } from "../index";

import * as ApiErrors from '../api-errors.js'

import { parseHexDomain, notNullHash, assertNullAddress} from '../utils'

import {
  basTraOwnershipInstance, basViewInstance, basMailManagerInstance,
  basExpireOwnershipInstance,
} from './index'

import { checkSupport } from "../networks";

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getAssetHashPager(chainId, wallet){
  if (!wallet) throw ApiErrors.PARAM_ILLEGAL
  const web3js = winWeb3()

  const inst = basTraOwnershipInstance(web3js, chainId, { from: wallet })

  const total = await inst.methods.assetsCountsOf().call({ from: wallet })

  let pager = {
    total:0,
    hashes:[],
    assets:[]
  }
  if (parseInt(total) === 0) return pager
  pager.total = total;

  const hashes = await inst.methods.assetsOf(0,total).call()
  pager.hashes = hashes

  const viewInst = basViewInstance(web3js, chainId, { from: wallet })
  const mailManager = basMailManagerInstance(web3js, chainId, { from: wallet })



  let assets = []
  for(let i = 0;i<hashes.length;i++){
    const hash = hashes[i]

    const ret = await viewInst.methods.queryDomainInfo(hash).call()
    if(!ret.name||!ret.expiration)continue;
    const mailState = await mailManager.methods.mailConfigs(hash).call()

    let asset = transAsset(ret, hash, chainId, Boolean(mailState.active), Boolean(mailState.openToPublic))
    assets.push(asset)
  }

  pager.assets = assets

  return pager

  function transAsset(ret, hash, chainId, mailActived,mailPublic){
    let domaintext = parseHexDomain(ret.name)
    let info = {
      "hash":hash,
      "chainId":chainId,
      mailActived: mailActived,
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
      isorder: Boolean(ret.isMarketOrder),
      mailPublic: mailPublic
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

  const hashes = await owsInst.methods.assetsOf(0, total).call()
  pager.hashes = hashes

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

/**
 * Load EWallet ,need checksupport chainId
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getWalletMails(chainId,wallet){
  if (!wallet) throw ApiErrors.PARAM_ILLEGAL
  const web3js = winWeb3()

  const exoInst = basExpireOwnershipInstance(web3js,chainId,{from:wallet})
  const view = basViewInstance(web3js, chainId, { from: wallet })
  const total = await exoInst.methods.assetsCountsOf().call()

  const mails = []

  if(parseInt(total) === 0)return mails;

  const hashes = await exoInst.methods.assetsOf(0,total).call()

  for(let j = 0;j< hashes.length;j++){
    const hash = hashes[j]
    if (notNullHash(hash)){
      const mailRet = await view.methods.queryEmailInfo(hash).call()

      if (mailRet.owner && !assertNullAddress(mailRet.owner)){
        let mail = {
          hash:hash,
          owner: mailRet.owner,
          domainhash:mailRet.domainHash,
          alias:mailRet.aliasName,
          aliasName: mailRet.aliasName ? Web3.utils.hexToString(mailRet.aliasName) : '',
          bca: mailRet.bcAddress ? Web3.utils.hexToString(mailRet.bcAddress):'',
          expiration:mailRet.expiration,
          domaintext: '',
          abandoned: !Boolean(mailRet.isValid),
        }

        const domainRet = await view.methods.queryDomainInfo(mailRet.domainHash).call()

        if(domainRet.name){
          mail.domaintext = parseHexDomain(domainRet.name)
          mails.push(mail)
        }
      }
    }
  }
  //console.log(mails)
  return mails;
}

export async function getMyOrders(chainId,wallet){
  if (!wallet || !checkSupport(chainId)) throw ApiErrors.PARAM_ILLEGAL
  const web3js = winWeb3()


}

export const OrderProps = [
  "hash","domaintext","salewei","invalid",
]

export default {
  getAssetHashPager,
  getMyAssets,
  getWalletMails,
}
