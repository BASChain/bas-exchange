import * as types from './mutation-types'
import { checkSupport } from '@/bizlib/networks'
import {
  getBalances
} from '@/web3-lib/apis/token-api'

import { loadDappConfProps } from "@/web3-lib/apis/dapp-conf-api";
import { getRootDomains } from '@/web3-lib/apis/domain-api'

import {
  ROOT_ASSETS,
  OPEN_MAILS,
  checkStorage,
  saveToStorage,
} from '@/bascore/indexDBService.js'


const DEF_DATA_TYPE_DICTS = [
]

import { publicMailDomains } from '@/web3-lib/apis/view-api'

/**
 * reload open mail on BlockChain
 * @param {*} param0
 */
export async function loadPublicMailDomains({commit,state}){
  const chainId = state.chainId
  const assets = await publicMailDomains(chainId)

  commit(types.LOAD_PUBLIC_MAIL_ASSETS,assets)
  try{
    await saveToStorage(OPEN_MAILS, assets)
  }catch(ex){
    console.log(ex)
  }
}
/**
 *
 * @param {*} param0
 */
export async function fillPublicMailDomains({ commit, state }) {
  try{
    console.log('fill open mails')
    const mails = await checkStorage(OPEN_MAILS)
    console.log('fill open mails>>>>>',mails)
    commit(types.LOAD_PUBLIC_MAIL_ASSETS, assets)
  }catch(ex){
    console.log('fill open mails fail')
  }
}

export async function loadRootAssets({commit,state}){
  const chainId = state.chainId
  const assets = await getRootDomains(chainId)

  commit(types.LOAD_ROOT_ASSETS, assets)
  try{
    await saveToStorage(ROOT_ASSETS, assets)
    console.log("Sync Root Assets completed.", assets.length)
  }catch(ex){
    console.log('Sync Root Assets fail',ex)
  }
}

/**
 *
 */
export async function fillRootAssets({commit}){
  try{
    const assets = await checkStorage(ROOT_ASSETS)
    console.log('fecth root assets fill store',assets)
    if (assets) commit(types.LOAD_ROOT_ASSETS, assets)
  }catch(ex){
    console.log("fill root assets fail",ex)
  }
}

/**
 * main js load once
 */
export function checkInjected({commit}){
  const injected = window.web3 && window.ethereum && window.ethereum.isMetaMask;
  commit(types.SET_INJECTED, injected);
}

/**
 * if _metamask.unlock auto login
 * @param {*} param0
 */
export async function autoLoginMetaMask({commit}){
  const web3js = window.web3
  const ethereum = window.ethereum;

  if (web3js && ethereum && ethereum._metamask && ethereum._metamask.isUnlocked()){
    const chainId = await web3js.eth.getChainId();
    const accounts = await web3js.eth.getAccounts();

    if(checkSupport(chainId) && accounts && accounts.length){
      commit(types.SET_METAMASK_LOGIN,{chainId,wallet:accounts[0]})
      console.log('auto login metamask', chainId, accounts[0])
    }
  }else {
    commit(types.CLEAN_WEB3_STATE)
  }
}

/**
 * load Balances :eth bas
 * @param {*} param0
 */
export async function loadDappBalances({commit,state}){
  const chainId = state.chainId
  const wallet = state.wallet
  console.log('load Balance on ',chainId)
  if(chainId && wallet){
    const resp = await getBalances(chainId,wallet);
    console.log("load balances dispatch", resp);
    commit(types.SET_BALANCES, resp);
  }
}

/**
 * load DAppConfiguration from Server api
 * @param {*} param0
 * @param {*} param1
 */
export async function loadDAppConfiguration({commit,state}){
  //Because metamask not login or uninstall show domain state data transfrom maybe need.
  //like domain price trans wei to bas ed.
  //TODO call server api should get all dappState
  try{
    const payload = await loadDappConfProps()
    commit(types.LOAD_DAPP_CONFIG,payload)
    const maxYear = payload.maxRegYears
    if (maxYear){
      commit(types.LOAD_DOMAIN_YEAR_ITEMS, maxYear)
    }
  }catch(ex){
    console.error(ex)
  }
}

/**
 * load Domain data type dictions from contract
 *
 * @param {*} param0
 * @param {*} param1
 */
export async function loadDataTypeDiction({commit,state},{chainId=3}){
  //TODO
}

export default {
  checkInjected,
  autoLoginMetaMask,
  loadDappBalances,
  loadDAppConfiguration,
  loadRootAssets,
  loadPublicMailDomains,
  fillRootAssets,
  fillPublicMailDomains,
};
