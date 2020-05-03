import * as Types from './name-enums'

import { BasTokenAddresses, BasTokenABI } from "./bas-token";

import { BasOANNAddresses, BasOANNABI } from "./bas-oann";


export function getLocalAddress(networks) {
  if (!networks || !Object.keys(networks).length) return "";
  let keys = Object.keys(networks);
  if (!keys || !keys.length) return "";
  const max = Math.max(...keys);
  return networks[max].address;
}

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
