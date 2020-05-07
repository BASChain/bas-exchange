import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

/**
 * s-r:0x95F733f7D86944bB4adC8E258296A312F7D7F13E
 * l-r:0x2B659D2C5915F47A2504E4d4945A4eA701c45b61
 */
export const BasDomainConfAddresses = {
  1: "",
  3: "0x95F733f7D86944bB4adC8E258296A312F7D7F13E"
};

export const BasDomainConfABI = ContractsJson.BasDomainConf.abi;

export default {
  BasDomainConfAddresses: assembleAddresses(
    BasDomainConfAddresses,
    ContractsJson.BasDomainConf.networks
  ),
  BasDomainConfABI
};
