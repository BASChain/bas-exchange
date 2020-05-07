import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

/**
 * s-r:0x0fA0408ed2897Ee0c07a3A3Bbd60b83093C55995
 * l-r:0xa3F8a61fA43Af82CAfd5C98d30A4Af7AC8357fbe
 */
export const BasSubDomainAddresses = {
  1: "",
  3: "0x0fA0408ed2897Ee0c07a3A3Bbd60b83093C55995"
};

export const BasSubDomainABI = ContractsJson.BasSubDomain.abi;

export default {
  BasSubDomainAddresses: assembleAddresses(
    BasSubDomainAddresses,
    ContractsJson.BasSubDomain.networks
  ),
  BasSubDomainABI
};
