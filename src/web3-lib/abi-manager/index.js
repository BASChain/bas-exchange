import * as Types from './name-enums'

import { BasAccountantABI, BasAccountantAddresses} from './bas-accountant'
import { BasDomainConfAddresses, BasDomainConfABI } from "./bas-domainconf";
import { BasExpiredOwnershipABI, BasExpiredOwnershipAddresses}  from './bas-expirated-ownership'

import {BasRootDomainABI,BasRootDomainAddresses} from './bas-rootdomain'
import {BasSubDomainABI,BasSubDomainAddresses} from './bas-subdomain'

import { BasMailManagerABI, BasMailManagerAddresses} from './bas-mail-manager'
import basMailContract from './bas-mail.js'

import basMarketContract from './bas-market'

import { BasMinerABI,BasMinerAddresses} from './bas-miner'

import basTokenContract from "./bas-token";

import { BasTradableOwnershipABI, BasTradableOwnershipAddresses} from './bas-tradable-ownership'

import basOANNContract from "./bas-oann";

import basViewContract from './bas-view'

/**
 *
 */
export default {
  [Types.BasAccountant](chainId){
    return {
      abi: BasAccountantABI,
      address: BasAccountantAddresses[chainId] || ''
    };
  },
  [Types.BasDomainConf](chainId) {
    return {
      address: BasDomainConfAddresses[chainId] || '',
      abi: BasDomainConfABI
    };
  },
  [Types.BasExpireOwnership](chainId){
    return {
      abi: BasExpiredOwnershipABI,
      address: BasExpiredOwnershipAddresses[chainId] || ''
    };
  },
  [Types.BasMailManager](chainId){
    return {
      abi: BasMailManagerABI,
      address: BasMailManagerAddresses[chainId] || ''
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
      abi: BasMinerABI,
      address: BasMinerAddresses[chainId] || ''
    }
  },
  [Types.BasOANN](chainId) {
    return {
      abi: basOANNContract.BasOANNABI,
      address: basOANNContract.BasOANNAddresses[chainId] || ''
    }
  },
  [Types.BasRootDomain](chainId){
    return {
      abi: BasRootDomainABI,
      address: BasRootDomainAddresses[chainId]||''
    };
  },
  [Types.BasSubDomain](chainId){
    return {
      abi: BasSubDomainABI,
      address: BasSubDomainAddresses[chainId]||''
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
      abi: BasTradableOwnershipABI,
      address: BasTradableOwnershipAddresses[chainId] || ''
    }
  },
  [Types.BasView](chainId) {
    return {
      abi: basViewContract.BasViewABI,
      address: basViewContract.BasViewAddresses[chainId] ||''
    };
  }
}
