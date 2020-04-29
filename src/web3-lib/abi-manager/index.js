import * as Types from './name-enums'

import { BasTokenAddresses, BasTokenABI } from "./bas-token";

import { BasOANNAddresses, BasOANNABI } from "./bas-oann";

/**
 *
 */
export default {
  [Types.BasToken](chainId){
    return {
      abi: BasTokenABI,
      address: BasTokenAddresses[chainId] || ""
    };
  },
  [Types.BasOANN](chainId) {
    return {
      abi:BasOANNABI,
      address:BasOANNAddresses(chainId) ||''
    }
  }
}
