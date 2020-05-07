import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasTradableOwnershipAddresses = {
  1: "",
  3: "0xa3F8a61fA43Af82CAfd5C98d30A4Af7AC8357fbe"
};

export const BasTradableOwnershipABI = ContractsJson.BasTradableOwnership.abi;

export default {
  BasTradableOwnershipAddresses: assembleAddresses(
    BasTradableOwnershipAddresses,
    ContractsJson.BasTradableOwnership.networks
  ),
  BasTradableOwnershipABI
};
