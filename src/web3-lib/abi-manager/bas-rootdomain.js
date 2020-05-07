import ContractsJson from './contracts'

import { assembleAddresses } from "./addrutils.js";

/**
 * s-r:0xA64732B796255c7065e2bD5CC32e9898e9EdA752
 * l-r:0xd0d8C869A67f5FC9a2B4498339268b3f994b668a
 */
export const BasRootDomainAddresses = {
  1: "",
  3: "0xA64732B796255c7065e2bD5CC32e9898e9EdA752"
};

export const BasRootDomainABI = ContractsJson.BasRootDomain.abi

export default {
  BasRootDomainAddresses: assembleAddresses(
    BasRootDomainAddresses,
    ContractsJson.BasRootDomain.networks
  ),
  BasRootDomainABI
};
