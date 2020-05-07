import * as Types from './name-enums'

import accountantContract from './bas-accountant'
import domainConfContract from "./bas-domainconf";
import expiratedOwnershipContract  from './bas-expirated-ownership'

import rootDomainContract from './bas-rootdomain'
import subDomainContract from './bas-subdomain'

import basMailManagerContract from './bas-mail-manager'
import basMailContract from './bas-mail.js'

import basMarketContract from './bas-market'

import minerContract from './bas-miner'

import basTokenContract from "./bas-token";

import troContract from './bas-tradable-ownership'

import basOANNContract from "./bas-oann";

import basViewContract from './bas-view'

/**
 *
 */
export default {
  [Types.BasAccountant](chainId){
    return {
      abi: accountantContract.BasAccountantABI,
      address: accountantContract.BasAccountantAddresses[chainId] || ""
    };
  },
  [Types.BasDomainConf](chainId) {
    return {
      address: domainConfContract.BasDomainConfAddresses[chainId] || "",
      abi: domainConfContract.BasDomainConfABI
    };
  },
  [Types.BasExpireOwnership](chainId){
    return {
      abi: expiratedOwnershipContract.BasExpiredOwnershipABI,
      address:
        expiratedOwnershipContract.BasExpiredOwnershipAddresses[chainId] || ""
    };
  },
  [Types.BasMailManager](chainId){
    return {
      abi: basMailManagerContract.BasMailManagerABI,
      address: basMailManagerContract.BasMailManagerAddresses[chainId] || ""
    };
  },
  [Types.BasMail](chainId){
    return {
      abi: basMailContract.BasMailABI,
      address: basMailContract.BasMailAddresses[chainId] || ''
    }
  },
  [Types.BasMarket](chainId) {
    return {
      abi: basMarketContract.BasMarketABI,
      address: basMarketContract.BasMarketAddresses[chainId] || ''
    }
  },
  [Types.BasMiner](chainId) {
    return {
      abi: minerContract.BasMinerABI,
      address: minerContract.BasMinerAddresses[chainId] || ""
    };
  },
  [Types.BasOANN](chainId) {
    return {
      abi: basOANNContract.BasOANNABI,
      address: basOANNContract.BasOANNAddresses[chainId] || ''
    }
  },
  [Types.BasRootDomain](chainId){
    return {
      abi: rootDomainContract.BasRootDomainABI,
      address: rootDomainContract.BasRootDomainAddresses[chainId] || ""
    };
  },
  [Types.BasSubDomain](chainId){
    return {
      abi: subDomainContract.BasSubDomainABI,
      address: subDomainContract.BasSubDomainAddresses[chainId] || ""
    };
  },
  [Types.BasToken](chainId){
    return {
      abi: basTokenContract.BasTokenABI,
      address: basTokenContract.BasTokenAddresses[chainId] || ""
    };
  },
  [Types.BasTradableOwnership](chainId) {
    return {
      abi: troContract.BasTradableOwnershipABI,
      address: troContract.BasTradableOwnershipAddresses[chainId] || ""
    };
  },
  [Types.BasView](chainId) {
    return {
      abi: basViewContract.BasViewABI,
      address: basViewContract.BasViewAddresses[chainId] ||''
    };
  }
}
