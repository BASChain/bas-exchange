import ContractsJson from './contracts'

import { assembleAddresses } from "./addrutils.js";

export const BasRootDomainAddresses = {
         1: "",
         3: "0x2df343f6ad1ee795efb1f9a2ac0e38da55fba7a7"
       };

export const BasRootDomainABI = ContractsJson.BasRootDomain.abi

export default {
  BasRootDomainAddresses: assembleAddresses(
    BasRootDomainAddresses,
    ContractsJson.BasRootDomain.networks
  ),
  BasRootDomainABI
};
