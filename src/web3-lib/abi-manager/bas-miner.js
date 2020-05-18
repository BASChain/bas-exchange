import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0x720Da26432b6501AeD0020dA04ee67257928d9BD
 * s-r:0xfc9fecfbDB278FFd879ea1205a2e7503E1fd2bfC
 */
export const BasMinerABI = ContractsJson.BasMiner.abi;

export default {
  BasMinerAddresses: assembleAddresses(
    ContractNames.BasMiner,
    ContractsJson.BasMiner.networks
  ),
  BasMinerABI
};
