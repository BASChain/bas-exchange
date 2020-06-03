//import Web3 from 'web3'

import { DefaultNetWork } from '../networks'
import { HttpInfuraProviderURL } from './providerurl'

export const infuraWallet = '0xFd30d2c32E6A22c2f026225f1cEeA72bFD9De865'

/**
 *
 * @param {*} chainId
 */
export async function getInfuraWeb3(chainId){
  let HttpProviderURL = HttpInfuraProviderURL(chainId)
  console.log(HttpProviderURL,chainId)
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
