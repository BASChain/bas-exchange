import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasDomainConfAddresses = {
  1: "",
  3: "0x2B659D2C5915F47A2504E4d4945A4eA701c45b61"
};

export const BasDomainConfABI = ContractsJson.BasDomainConf.abi;

export default {
  BasDomainConfAddresses: assembleAddresses(
    BasDomainConfAddresses,
    ContractsJson.BasDomainConf.networks
  ),
  BasDomainConfABI
};
