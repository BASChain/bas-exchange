import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

/**
 * s-r:0x70094f6Ab7906B3e4fa0436eD3FbC816107b618e
 * l-r:0x2B659D2C5915F47A2504E4d4945A4eA701c45b61
 */
export const BasDomainConfAddresses = {
  1: "",
  3: "0x70094f6Ab7906B3e4fa0436eD3FbC816107b618e"
};

export const BasDomainConfABI = ContractsJson.BasDomainConf.abi;

export default {
  BasDomainConfAddresses: assembleAddresses(
    BasDomainConfAddresses,
    ContractsJson.BasDomainConf.networks
  ),
  BasDomainConfABI
};
