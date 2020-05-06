import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasSubDomainAddresses = {
         1: "",
         3: "0x47a6516ea37ef052e4c1481158b2c8c6c19a3760"
       };

export const BasSubDomainABI = ContractsJson.BasSubDomain.abi;

export default {
  BasSubDomainAddresses: assembleAddresses(
    BasSubDomainAddresses,
    ContractsJson.BasSubDomain.networks
  ),
  BasSubDomainABI
};
