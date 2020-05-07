import BasViewJson  from './contracts/BasView.json'

import { assembleAddresses } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0xf74b2b8E7a6A75222157a26a65554C1587fACED9
 * s-r:0xF696D463bb874cC44Db99Ae16BAaba3d16127e1C
 */
export const BasViewABI = BasViewJson.abi;

export default {
  BasViewAddresses: assembleAddresses(ContractNames.BasView, BasViewJson.networks),
  BasViewABI
};
