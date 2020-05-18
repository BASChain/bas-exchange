import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0x98c6f145B8fE9e77e3bBeA47165c3c39beeb6FE6
 * s-r:0x7c31C4Ed7e30082B913ece060FF12DE77DE7d260
 */
export const BasMarketABI = ContractsJson.BasMarket.abi;

export default {
  BasMarketAddresses: assembleAddresses(
    ContractNames.BasMarket,
    ContractsJson.BasMarket.networks
  ),
  BasMarketABI
};
