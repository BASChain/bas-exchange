import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

/**
 * l-r:0x720Da26432b6501AeD0020dA04ee67257928d9BD
 * s-r:0xfc9fecfbDB278FFd879ea1205a2e7503E1fd2bfC
 */
export const BasMinerAddresses = {
  1: "",
  3: "0xfc9fecfbDB278FFd879ea1205a2e7503E1fd2bfC"
};

export const BasMinerABI = ContractsJson.BasMiner.abi;

export default {
  BasMinerAddresses: assembleAddresses(
    BasMinerAddresses,
    ContractsJson.BasMiner.networks
  ),
  BasMinerABI
};
