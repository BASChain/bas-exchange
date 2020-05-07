import BasViewJson  from './contracts/BasView.json'

import { assembleAddresses } from "./addrutils.js";

export const BasViewAddresses = {
  1: "",
  3: "0xf74b2b8E7a6A75222157a26a65554C1587fACED9"
};

export const BasViewABI = BasViewJson.abi;

export default {
  BasViewAddresses: assembleAddresses(BasViewAddresses, BasViewJson.networks),
  BasViewABI
};
