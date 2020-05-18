import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";
import ContractNames from './name-enums'

/**
 * l-r:0x95167032CFfa2edD354Ba109B3D8867B0aA914ea
 * s-r:0xeF4Ec28594991f385a79fEBfB71EB18cc7da272A
 */
export const BasAccountantABI = ContractsJson.BasAccountant.abi;

export default {
  BasAccountantAddresses: assembleAddresses(
    ContractNames.BasAccountant,
    ContractsJson.BasAccountant.networks
  ),
  BasAccountantABI
};
