import ContractsJson from './contracts'

import { assembleAddresses } from "./addrutils.js";

/**
 * lan-r:0xF5E47f03955f0be82C5C77E233063160572320fF
 * ropsten:0xEB5a765d7e7802C3CDA01372eC6827E8fbab04B9
 */
export const BasExpiredOwnershipAddresses = {
  1: "",
  3: "0xEB5a765d7e7802C3CDA01372eC6827E8fbab04B9"
};

export const BasExpiredOwnershipABI = ContractsJson.BasExpiredOwnership.abi

export default {
  BasExpiredOwnershipAddresses: assembleAddresses(
    BasExpiredOwnershipAddresses,
    ContractsJson.BasExpiredOwnership.networks
  ),
  BasExpiredOwnershipABI
};
