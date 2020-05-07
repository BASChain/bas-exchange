import BasViewJson  from './contracts/BasView.json'

import { assembleAddresses } from "./addrutils.js";

/**
 * l-r:0xf74b2b8E7a6A75222157a26a65554C1587fACED9
 * s-r:0xF696D463bb874cC44Db99Ae16BAaba3d16127e1C
 */
export const BasViewAddresses = {
  1: "",
  3: "0xF696D463bb874cC44Db99Ae16BAaba3d16127e1C"
};

export const BasViewABI = BasViewJson.abi;

export default {
  BasViewAddresses: assembleAddresses(BasViewAddresses, BasViewJson.networks),
  BasViewABI
};
