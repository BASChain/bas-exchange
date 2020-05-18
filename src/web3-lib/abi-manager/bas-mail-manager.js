import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0xf7fC9d1e9c293dC0D8eCeF199f4e62BF1e755233
 * s-r:0xDa9d54E2a517AEe4339832bfE7a74d87513AeD9d
 */
export const BasMailManagerABI = ContractsJson.BasMailManager.abi;

export default {
  BasMailManagerAddresses: assembleAddresses(
    ContractNames.BasMailManager,
    ContractsJson.BasMailManager.networks
  ),
  BasMailManagerABI
};
