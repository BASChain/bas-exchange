import {
  LATEST_ROOT_DOMAINS,
  LATEST_SUB_DOMAINS,
  checkStorage,
  setData,
  saveToStorage,
} from '@/bascore/indexDBService.js'

import {
  getLatestRootDomains
} from '@/web3-lib/apis/indexeddb-assets'


import * as Types from './mutation-types'

/**
 * Synchronize data on the baschain
 * and refresh indexeddb
 * @param {*} param0
 */
export async function syncLatestRootDomains({ commit, rootState }) {
  const chainId = rootState.dapp.chainId || 3;
  console.log(chainId)
  try{
    const data = await getLatestRootDomains(chainId);
    if(data && data.length){
      await saveToStorage(LATEST_ROOT_DOMAINS,data)

      //console.log(ret)
    }
  }catch(ex){
    console.error('Synchronize data on the baschain ',ex)
  }
}

/**
 *
 * @param {*} param0
 */
export async function checkStorageRootIndexedDB({ commit ,rootState}){
  try{
    const data = await checkStorage(LATEST_ROOT_DOMAINS)
    console.log("get from indexedDB:",data)
    commit(Types.SET_LATEST_ROOT_DOMAINS,data)
  }catch(ex){
    console.log('load indexeddb to vue store')
  }
}

export default {
  syncLatestRootDomains,
  checkStorageRootIndexedDB
}
