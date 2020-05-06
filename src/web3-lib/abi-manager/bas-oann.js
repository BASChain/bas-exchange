import BasOANNJson from "./contracts/BasOANN.json";
import { assembleAddresses } from "./addrutils.js";
/**
 * V2
 */
export const BasOANNAddresses = {
         1: "0x6a76585B037988281Aa2c80E6E42d689bA940Cef",
         3: "0x5e6B639843da8A9883aF8055C71D21d7dd4c30C3"
       };

export const BasOANNABI = BasOANNJson.abi

export default {
  BasOANNAddresses: assembleAddresses(BasOANNAddresses,BasOANNJson.networks),
  BasOANNABI
};
