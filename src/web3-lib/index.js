import Web3 from 'web3'
import { BN } from "web3-utils";

import { checkSupport } from '@/bizlib/networks'
import store from "@/store";
import * as DappStoreTypes from '@/store/modules/dapp/mutation-types'

import { basTokenInstance } from "./apis";

import ApiErrors from './api-errors.js'

/**
 * call this need after thereum.enable().
 * get window web3
 */
export function winWeb3(){
  if (!window.ethereum || !window.web3) throw ApiErrors.NO_METAMASK
  return window.web3
}

/**
 * call this method,need check metamask injected
 */
export async function enableMetaMask() {
  try{
    const ethereum = window.ethereum;
    const accounts = await ethereum.enable();
    if (!accounts.length) throw ApiErrors.NO_ACCOUNT

    const wallet = accounts[0]
    const web3js = winWeb3();
    const chainId = await web3js.eth.getChainId();

    return {
      chainId,
      wallet
    }

  }catch(ex){
    console.log('MetaMask Enable Fail:',ex)
    if (ex.code === ApiErrors.USER_REJECTED_REQUEST){
      throw ApiErrors.USER_REJECTED_REQUEST
    } else if (ex.code === ApiErrors.RPC_TIMEOUT){
      throw ApiErrors.RPC_TIMEOUT;
    } else if (ex === ApiErrors.NO_ACCOUNT){
      throw ApiErrors.NO_ACCOUNT;
    }
  }
}

/**
 * call this function to start listener account and network changed.
 * required the metamask injected
 *
 */
export function startDappListener(){
  const web3js = winWeb3();
  const ethereum = window.ethereum

  if(!web3js || !ethereum){
    return Promise.reject('MetaMask env not injected. listener unloaded.')
  }

  /**
   * listener account changed
   */
  if(!ethereum.eventNames().find(n => n === 'accountsChanged')){
     ethereum.on('accountsChanged', async function (accounts) {
      const chainId = await web3js.eth.getChainId()
      // update ethwei baswei withdraw
      if(accounts.length){
        const wallet = accounts[0]
        console.log("Current account changed:",wallet)
        store.commit(`dapp/${DappStoreTypes.UPDATE_WALLET}`, wallet);

        const ethweiBN = new BN(await web3js.eth.getBalance(wallet), 16);
        store.commit(`dapp/${DappStoreTypes.UPDATE_ETHWEI}`, ethweiBN);

        if(checkSupport(chainId)){
          // baswei update
          const inst = basTokenInstance(web3js,chainId,{from:wallet});
          const basweiBN = new BN(await inst.methods.balanceOf(wallet).call(),16)
          store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, basweiBN);

          // withdrawwei update TODO

        }
      }
     })
  }

  if(!ethereum.eventNames().find(n=>n === 'networkChanged')){
    ethereum.on("networkChanged",async function(chainId){
      console.log("Current network changed",chainId)
      store.commit(`dapp/${DappStoreTypes.UPDATE_CHAINID}`, chainId);

      const accounts = await web3js.eth.getAccounts()
      if(accounts.length){
        const wallet = accounts[0]

        const ethweiBN = new BN(await web3js.eth.getBalance(wallet), 16);
        store.commit(`dapp/${DappStoreTypes.UPDATE_ETHWEI}`, ethweiBN);

        if(checkSupport(chainId)){
          const inst = basTokenInstance(web3js, chainId, { from: wallet });
          const basweiBN = new BN(
            await inst.methods.balanceOf(wallet).call(),
            16
          );
          store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, basweiBN);

          // withdrawwei update TODO

        }
      }

    });
  }

  return Promise.resolve('load listener completed.')
}

/**
 * Temp sultion
 * when refresh page load before Matemask login
 */
export async function globalWebState(){
  const web3 = window.web3
  if(!web3)return null;

  const chainId = await web3.eth.getChainId()
  const accounts = await web3.eth.getAccounts()

  const web3State = {
    chainId,
    wallet: accounts.length ? accounts[0]:''
  }

  return web3State
}

export default {
  winWeb3,
  startDappListener,
};
