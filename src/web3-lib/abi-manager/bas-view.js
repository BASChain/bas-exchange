import BasViewJson  from './contracts/BasView.json'

import { assembleAddresses } from "./addrutils.js";

export const BasViewAddresses = {
  1: "",
  3: ""
};

export const BasViewABI = BasViewJson.abi;


export default {
  BasViewAddresses: assembleAddresses(BasViewAddresses, BasViewJson.networks),
  BasViewABI
};
