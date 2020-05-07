import ContractsJson from './contracts'

import { assembleAddresses } from "./addrutils.js";

export const BasExpiredOwnershipAddresses = {
  1: "",
  3: "0xF5E47f03955f0be82C5C77E233063160572320fF"
};

export const BasExpiredOwnershipABI = ContractsJson.BasExpiredOwnership.abi

export default {
  BasExpiredOwnershipAddresses: assembleAddresses(
    BasExpiredOwnershipAddresses,
    ContractsJson.BasExpiredOwnership.networks
  ),
  BasExpiredOwnershipABI
};
