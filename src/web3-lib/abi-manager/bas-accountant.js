import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasAccountantAddresses = {
  1: "",
  3: "0x95167032CFfa2edD354Ba109B3D8867B0aA914ea"
};

export const BasAccountantABI = ContractsJson.BasAccountant.abi;

export default {
  BasAccountantAddresses: assembleAddresses(
    BasAccountantAddresses,
    ContractsJson.BasAccountant.networks
  ),
  BasAccountantABI
};
