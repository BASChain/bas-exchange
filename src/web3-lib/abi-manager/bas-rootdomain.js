import ContractsJson from './contracts'

import { assembleAddresses } from "./addrutils.js";

export const BasRootDomainAddresses = {
  1: "",
  3: "0xd0d8C869A67f5FC9a2B4498339268b3f994b668a"
};

export const BasRootDomainABI = ContractsJson.BasRootDomain.abi

export default {
  BasRootDomainAddresses: assembleAddresses(
    BasRootDomainAddresses,
    ContractsJson.BasRootDomain.networks
  ),
  BasRootDomainABI
};
