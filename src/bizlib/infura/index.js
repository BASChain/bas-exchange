import Web3 from 'web3'
import Vue from 'vue'

import { DefaultNetWork } from '../networks'
import { HttpInfuraProviderURL,DefAddress } from './providerurl'

/**
 *
 * @param {*} chainId
 */
export async function getInfuraWeb3(chainId){
  let _chainId = chainId || this.chainId;
  let HttpProviderURL = HttpInfuraProviderURL(chainId)
  return await new Web3(new Web3.providers.HttpProvider(HttpProviderURL))
}

export function BindInfura(obj){
  const $infura = function() {
    this.chainId = (ethereum && ethereum.chainId) ? parseInt(ethereum.chainId) : DefaultNetWork.chainId;
    let url = HttpInfuraProviderURL(this.chainId)
    this.providerURL = url;
    this.wallet = DefAddress
    return this;
  }

  $infura.prototype.chainIdChanged = function(chainId){
    if(chainId){
      this.chainId = chainId;
      this.providerURL = HttpInfuraProviderURL(chainId)
    }
  }
  $infura.prototype.changeWallet = function(wallet){
    if(wallet){
      this.wallet = wallet;
    }
  }
  $infura.prototype.getWeb3 = getInfuraWeb3
  obj.$infura = new $infura();
}

export default {
  getInfuraWeb3
}
