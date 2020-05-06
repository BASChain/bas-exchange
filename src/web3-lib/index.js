import Web3 from 'web3'
import { BN } from "web3-utils";

import { checkSupport } from '@/bizlib/networks'
import store from "@/store";
import * as DappStoreTypes from '@/store/modules/dapp/mutation-types'


import { basTokenInstance } from "./apis";
import ErrorCodes from './error-codes'

/**
 * call this need after thereum.enable().
 * get window web3
 */
export function winWeb3(){
  if(!window.ethereum || !window.web3) throw ErrorCodes.NO_METAMASK
  return window.web3
}

/**
 * call this method,need check metamask injected
 */
export async function enableMetaMask() {
  try{
    const ethereum = window.ethereum;
    const accounts = await ethereum.enable();
    if(!accounts.length)throw ErrorCodes.NO_ACCOUNT

    const wallet = accounts[0]
    const web3js = winWeb3();
    const chainId = await web3js.eth.getChainId();

    return {
      chainId,
      wallet
    }

  }catch(ex){
    console.log('MetaMask Enable Fail:',ex)
    if(ex.code === ErrorCodes.USER_REJECTED_REQUEST){
      throw ErrorCodes.USER_REJECTED_REQUEST
    }else if(ex.code === ErrorCodes.RPC_TIMEOUT){
      throw ErrorCodes.RPC_TIMEOUT;
    }else if(ex === ErrorCodes.NO_ACCOUNT){
      throw ErrorCodes.NO_ACCOUNT;
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


export default {
  winWeb3,
  startDappListener,
};
