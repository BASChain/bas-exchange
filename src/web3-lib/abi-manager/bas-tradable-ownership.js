import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

/**
 * l-r:0xa3F8a61fA43Af82CAfd5C98d30A4Af7AC8357fbe
 * r:0xF242ff24c1A90F89ae735C8a040a62081D8EF87B
 */
export const BasTradableOwnershipAddresses = {
  1: "",
  3: "0xF242ff24c1A90F89ae735C8a040a62081D8EF87B"
};

export const BasTradableOwnershipABI = ContractsJson.BasTradableOwnership.abi;

export default {
  BasTradableOwnershipAddresses: assembleAddresses(
    BasTradableOwnershipAddresses,
    ContractsJson.BasTradableOwnership.networks
  ),
  BasTradableOwnershipABI
};
