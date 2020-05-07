import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

/**
 * l-r:0xa3F8a61fA43Af82CAfd5C98d30A4Af7AC8357fbe
 * r:0xCec172c9a97B26C78BA00704A8598Bbbbc14e75c
 */
export const BasTradableOwnershipAddresses = {
  1: "",
  3: "0xCec172c9a97B26C78BA00704A8598Bbbbc14e75c"
};

export const BasTradableOwnershipABI = ContractsJson.BasTradableOwnership.abi;

export default {
  BasTradableOwnershipAddresses: assembleAddresses(
    BasTradableOwnershipAddresses,
    ContractsJson.BasTradableOwnership.networks
  ),
  BasTradableOwnershipABI
};
