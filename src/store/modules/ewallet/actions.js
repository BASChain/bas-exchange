import * as types from './mutation-types'
import { getAssetHashPager } from '@/web3-lib/apis/wallet-api.js'

import {checkSupport} from '@/bizlib/networks'

/**
 *
 * @param {*} param0
 * @param {*} args
 */
export async function loadMyAssets({ commit }, payload={chainId,wallet}) {

  const chainId = payload.chainId;
  const wallet = payload.wallet;
  console.log(payload,chainId,wallet)
  if (!chainId || !wallet){
    console.error('chainId or wallet required.')
  } else if (!checkSupport(chainId)){
    console.error(`Network ${chainId} unsupport.`)
  }else {
    const pager = await getAssetHashPager(chainId, wallet);
    commit(types.LOAD_EWALLET_HASHES,pager.hashes)
    commit(types.SET_EWALLET_TOTAL,pager.total)
    commit(types.LOAD_EWALLET_ASSETS,pager.assets)
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

export default {
  loadMyAssets,
  updateAssetProps
}
