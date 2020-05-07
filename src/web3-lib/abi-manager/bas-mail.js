import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasMailAddresses = {
  1: "",
  3: "0xEe2e88927dC75c7E25406456613Eac3Be24d4661"
};

export const BasMailABI = ContractsJson.BasMail.abi;

export default {
  BasMailAddresses: assembleAddresses(
    BasMailAddresses,
    ContractsJson.BasMail.networks
  ),
  BasMailABI
};
