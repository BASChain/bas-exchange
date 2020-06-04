
import store from "@/store";
import * as DappStoreTypes from '@/store/modules/dapp/mutation-types'
import { winWeb3 } from '@/web3-lib'

import { basTokenInstance } from "@/web3-lib/apis";
import { checkSupport} from '@/web3-lib/networks'

const BN = Web3.utils.BN


/**
 * call this function to start listener account and network changed.
 * required the metamask injected
 *
 */
export function startDappListener() {
  const web3js = winWeb3();
  const ethereum = window.ethereum

  if (!web3js || !ethereum) {
    return Promise.reject('MetaMask env not injected. listener unloaded.')
  }

  /**
   * listener account changed
   */
  if (!ethereum.eventNames().find(n => n === 'accountsChanged')) {
    ethereum.on('accountsChanged', async function (accounts) {
      const chainId = await web3js.eth.getChainId()
      // update ethwei baswei withdraw
      if (accounts.length) {
        const wallet = accounts[0]
        console.log("Current account changed:", wallet)
        store.commit(`dapp/${DappStoreTypes.UPDATE_WALLET}`, wallet);

        const ethweiBN = new BN(await web3js.eth.getBalance(wallet), 16);
        store.commit(`dapp/${DappStoreTypes.UPDATE_ETHWEI}`, ethweiBN);

        if (checkSupport(chainId)) {
          // baswei update
          const inst = basTokenInstance(web3js, chainId, { from: wallet });
          const basweiBN = new BN(await inst.methods.balanceOf(wallet).call(), 16)
          store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, basweiBN);

          // withdrawwei update TODO

          //loadMyAssets
          //store.dispatch('ewallet/loadRootAssets', {chainId,wallet:accouts[0]})
          store.dispatch('ewallet/syncEWalletAssets', {chainId:chainId,wallet})

        }
      } else {
        store.commit(`dapp/${DappStoreTypes.UPDATE_WALLET}`, null);
      }
    })
  }

  if (!ethereum.eventNames().find(n => n === 'networkChanged')) {
    ethereum.on("networkChanged", async function (chainId) {
      console.log("Current network changed", chainId)
      store.commit(`dapp/${DappStoreTypes.UPDATE_CHAINID}`, chainId);

      const accounts = await web3js.eth.getAccounts()
      if (accounts.length) {
        const wallet = accounts[0]

        const ethweiBN = new BN(await web3js.eth.getBalance(wallet), 16);
        store.commit(`dapp/${DappStoreTypes.UPDATE_ETHWEI}`, ethweiBN);

        if (checkSupport(chainId)) {
          const inst = basTokenInstance(web3js, chainId, { from: wallet });
          const basweiBN = new BN(
            await inst.methods.balanceOf(wallet).call(),
            16
          );
          store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, basweiBN);

          //loadRootAssets
          store.dispatch('dapp/loadRootAssets')
          try{
            store.dispatch('ewallet/syncEWalletAssets', { chainId: chainId, wallet })
          }catch(ex){}

        }
      }

    });
  }

  return Promise.resolve('load listener completed.')
}
