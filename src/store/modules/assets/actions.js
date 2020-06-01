import {
  LATEST_ROOT_DOMAINS,
  LATEST_SUB_DOMAINS,
  checkStorage,
  setData,
  saveToStorage,
} from '@/bascore/indexDBService.js'

import {
  getLatestRootDomains, getLatestSubDomains
} from '@/web3-lib/apis/indexeddb-assets'


import * as Types from './mutation-types'

/**
 * Synchronize data on the baschain
 * and refresh indexeddb
 * @param {*} param0
 */
export async function syncLatestRootDomains({ commit, rootState }) {
  const chainId = rootState.dapp.chainId || 3;

  try{
    const data = await getLatestRootDomains(chainId);
    if(data){
      commit(Types.SET_LATEST_ROOT_DOMAINS, data)
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
export async function syncLatestSubDomains({ commit, rootState }) {
  const chainId = rootState.dapp.chainId || 3;

  try {
    const data = await getLatestSubDomains(chainId);
    if (data) {
      commit(Types.SET_LATEST_SUB_DOMAINS, data)
      await saveToStorage(LATEST_SUB_DOMAINS, data)
      console.log("Synchronize sundomain data on the baschain",data.length)
    }
  } catch (ex) {
    console.error('Synchronize data on the baschain ', ex)
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

export async function checkStorageSubIndexedDB({ commit, rootState }) {
  try {
    const data = await checkStorage(LATEST_SUB_DOMAINS)
    console.log("get from indexedDB:", data)
    commit(Types.SET_LATEST_SUB_DOMAINS, data)
  } catch (ex) {
    console.log('load sub indexeddb to vue store fail')
  }
}

/**
 *
 * @param {*} param0
 */
export async function checkStorageIndexedDB({ commit, rootState }) {
  try {

    const rootData = await checkStorage(LATEST_ROOT_DOMAINS)
    commit(Types.SET_LATEST_ROOT_DOMAINS, rootData)

    const subData = await checkStorage(LATEST_SUB_DOMAINS)
    commit(Types.SET_LATEST_SUB_DOMAINS, subData)

    console.log("get Domains from indexedDB Completed.",subData.length)
  } catch (ex) {
    console.log('load indexeddb to vue store fail')
  }
}

export default {
  syncLatestRootDomains,
  syncLatestSubDomains,
  checkStorageRootIndexedDB,
  checkStorageSubIndexedDB,
  checkStorageIndexedDB
}
