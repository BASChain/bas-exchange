import * as types from './mutation-types'
import { checkSupport } from '@/bizlib/networks'
import {
  getBalances
} from '@/web3-lib/apis/token-api'

import { loadDappConfProps } from "@/web3-lib/apis/dapp-conf-api";



const DEF_DATA_TYPE_DICTS = [
]

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
    const accounts = await web3.eth.getAccounts();

    if(checkSupport(chainId) && accounts && accounts.length){
      commit(types.SET_METAMASK_LOGIN,{chainId,wallet:accounts[0]})
      console.log('auto login metamask')
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
  loadDAppConfiguration
};
