import * as types from './mutation-types'
import {
  getAssetHashPager, getWalletMails
 } from '@/web3-lib/apis/wallet-api.js'

import { getMailInfo, getDomainInfo } from '@/web3-lib/apis/view-api'

import {checkSupport} from '@/bizlib/networks'

/**
 *
 * @param {*} param0
 * @param {*} args
 */
export async function loadMyAssets({ commit, rootState}, payload={chainId,wallet}) {

  const chainId = payload.chainId;
  const wallet = payload.wallet;
  //console.log(payload,chainId,wallet)
  if (!chainId || !wallet){
    console.error('chainId or wallet required.')
  } else if (!checkSupport(chainId)){
    console.error(`Network ${chainId} unsupport.`)
  }else {
    const max = rootState.dapp.maxRegYears || 5
    const pager = await getAssetHashPager(chainId, wallet);
    commit(types.LOAD_EWALLET_HASHES,pager.hashes)
    commit(types.SET_EWALLET_TOTAL,pager.total)
    let assets = pager.assets
    if(assets && assets.length){
      assets = assets.map(asset => {
        asset.canRechargeYear = calcRechargeYear(asset.expire,max)
        return asset
      })
    }
    commit(types.LOAD_EWALLET_ASSETS, assets)
  }
}

export function removeMyAssetByHash({commit},hash) {
  commit(types.REMOVE_ASSET_BY_HASH,hash)
}



/**
 *
 * @param {*} param0
 * @param {*} payload
 */
export async function loadEWalletMails({ commit, rootState},payload={chainId,wallet}){
  const chainId = payload.chainId;
  const wallet = payload.wallet;
  //console.log(payload, chainId, wallet)
  if (!chainId || !wallet) {
    console.error('chainId or wallet required.')
  } else if (!checkSupport(chainId)) {
    console.error(`Network ${chainId} unsupport.`)
  } else {
    try{
      console.log('load My mail list...')
      let mails = await getWalletMails(chainId,wallet)
      const max = rootState.dapp.maxMailRegYears||5
      mails.map(m =>{
        m.canRechargeYear = calcRechargeYear(m.expiration,max)
        return m
      });
      commit(types.LOAD_EWALLET_MAILS,mails)
    }catch(ex){
      console.error('load wallet mails',ex)
    }
  }
}

/**
 * update my assets props
 * @param {*} param0
 * @param {*} payload hash required
 */
export function updateAssetProps({commit},payload){
  commit(types.UPDATE_ASSET_PROPS,payload)
}

/**
 * hash
 * @param {*} param0
 * @param {*} payload
 */
export function updataMyMailProps({commit},payload){
  console.log(payload)
  commit(types.UPDATE_EWMAIL_PROPS,payload)
}

export async function updateMailInfo({ commit, rootState},payload={hash,chainId}){
  try{
    const hash = payload.hash
    const chainId = payload.chainId
    if(hash && checkSupport(chainId)){
      const resp = await getMailInfo(hash,chainId)
      if(resp.state){
        const max = rootState.dapp.maxMailRegYears || 5
        const canRechargeYear = calcRechargeYear(resp.mail.expiration,max)
        const mail = { hash, expiration: resp.mail.expiration, canRechargeYear: canRechargeYear}
        console.log(">>>>",mail)
        //'domainhash', 'expiration', 'alias','aliasName','owner','hash','domaintext'
        commit(types.UPDATE_EWMAIL_PROPS,mail)
      }
    }
  }catch(ex){
    console.error(ex)
  }
}

/**
 *
 * @param {*} param0
 * @param {*} payload
 */
export async function updateMyAsset({commit,rootState},payload = {hash}){
  const hash = payload.hash
  const chainId = rootState.dapp.chainId
  if(!checkSupport(chainId) || !hash)return
  try{
    const resp = await getDomainInfo(hash,chainId)
    if(resp.state){
      const asset = resp.assetinfo
      const canRechargeYear = calcRechargeYear(asset.expire,rootState.maxRegYears)
      commit(types.UPDATE_ASSET_PROPS, Object.assign({}, asset, { canRechargeYear: canRechargeYear}))
    }
  }catch(ex){
    console.error('update asset error',hash)
  }

}

/**
 *
 * @param {*} expire
 * @param {*} max
 */
function calcRechargeYear(expire,max){
  if(!expire) return max || 5
  const expireTS = expire * 1000;
  const currTS = new Date()
  if ((currTS.getTime() / 1000 - expire) > 0) return 5;

  const maxTmpTS = currTS.getTime() + (5 * 365 + 1) * 24 * 3600 * 1000;
  let maxYearTS = maxTmpTS - expireTS
  return Math.floor(maxYearTS / (365 * 24 * 3600 * 1000))
}

export default {
  loadMyAssets,
  updateAssetProps,
  loadEWalletMails,
  updataMyMailProps,
  removeMyAssetByHash,
  updateMailInfo,
  updateMyAsset,
}
