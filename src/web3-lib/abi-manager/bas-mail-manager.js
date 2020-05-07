import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasMailManagerAddresses = {
  1: "",
  3: "0xf7fC9d1e9c293dC0D8eCeF199f4e62BF1e755233"
};

export const BasMailManagerABI = ContractsJson.BasMailManager.abi;

export default {
  BasMailManagerAddresses: assembleAddresses(
    BasMailManagerAddresses,
    ContractsJson.BasMailManager.networks
  ),
  BasMailManagerABI
};
