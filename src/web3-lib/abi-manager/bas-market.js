import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasMarketAddresses = {
  1: "",
  3: "0x98c6f145B8fE9e77e3bBeA47165c3c39beeb6FE6"
};

export const BasMarketABI = ContractsJson.BasMarket.abi;

export default {
  BasMarketAddresses: assembleAddresses(
    BasMarketAddresses,
    ContractsJson.BasMarket.networks
  ),
  BasMarketABI
};
