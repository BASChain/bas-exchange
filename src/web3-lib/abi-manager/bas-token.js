import BasTokenJson from './contracts/BasToken.json'
import { assembleAddresses } from "./addrutils.js";

/**
 * lan: 0xca2140437D9748Af1DA883cADD5997C56A1ff19D
 * ropsten: 0xC51A675D2f18e9912E3bd67014F0892177A9318C
 */
export const BasTokenAddresses = {
  1: "0x105B1413461394148023FEB5bE3b4307448872d5",
  3: "0xC51A675D2f18e9912E3bd67014F0892177A9318C",
};

export const BasTokenABI = BasTokenJson.abi

export default {
  'BasTokenAddresses': assembleAddresses(BasTokenAddresses, BasTokenJson.networks),
  BasTokenABI
};
