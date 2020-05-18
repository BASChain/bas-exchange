import ContractsJson from './contracts'

import { assembleAddresses } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * s-r:0xA64732B796255c7065e2bD5CC32e9898e9EdA752
 * l-r:0xd0d8C869A67f5FC9a2B4498339268b3f994b668a
 */
export const BasRootDomainABI = ContractsJson.BasRootDomain.abi

export default {
  BasRootDomainAddresses: assembleAddresses(
    ContractNames.BasRootDomain,
    ContractsJson.BasRootDomain.networks
  ),
  BasRootDomainABI
};
