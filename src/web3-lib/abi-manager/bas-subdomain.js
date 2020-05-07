import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasSubDomainAddresses = {
  1: "",
  3: "0xa3F8a61fA43Af82CAfd5C98d30A4Af7AC8357fbe"
};

export const BasSubDomainABI = ContractsJson.BasSubDomain.abi;

export default {
  BasSubDomainAddresses: assembleAddresses(
    BasSubDomainAddresses,
    ContractsJson.BasSubDomain.networks
  ),
  BasSubDomainABI
};
