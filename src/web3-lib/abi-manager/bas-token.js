import BasTokenJson from './contracts/BasToken.json'
import { assembleAddresses } from "./addrutils.js";

/**
 * sun: 0xb9291744e91fAd68060D7Cbfc702f13F64E6E7C5
 * 0309: 0x9d0314f9Bacd569DCB22276867AAEeE1C8A87614
 */
export const BasTokenAddresses = {
  1: "0x105B1413461394148023FEB5bE3b4307448872d5",
  3: "0xca2140437D9748Af1DA883cADD5997C56A1ff19D",
};

export const BasTokenABI = BasTokenJson.abi

export default {
  'BasTokenAddresses': assembleAddresses(BasTokenAddresses, BasTokenJson.networks),
  BasTokenABI
};
