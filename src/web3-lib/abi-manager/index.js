import * as Types from './name-enums'

import {BasRootDomainABI,BasRootDomainAddresses} from './bas-rootdomain'
import {BasSubDomainABI,BasSubDomainAddresses} from './bas-subdomain'
import { BasDomainConfAddresses, BasDomainConfABI } from "./bas-domainconf";

import { BasTokenAddresses, BasTokenABI } from "./bas-token";

import { BasOANNAddresses, BasOANNABI } from "./bas-oann";

import {BasViewAddresses,BasViewABI } from './bas-view'

/**
 *
 */
export default {
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
  [Types.BasDomainConf](chainId){
    return {
      address: BasDomainConfAddresses[chainId]||'',
      abi: BasDomainConfABI
    };
  },
  [Types.BasToken](chainId){
    return {
      abi: BasTokenABI,
      address: BasTokenAddresses[chainId] || ""
    };
  },
  [Types.BasOANN](chainId) {
    return {
      abi:BasOANNABI,
      address:BasOANNAddresses[chainId] ||''
    }
  },
  [Types.BasView](chainId) {
    return {
      abi: BasViewABI,
      address: BasViewAddresses[chainId] ||''
    };
  }
}
