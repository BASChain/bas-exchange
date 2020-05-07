import ContractsJson from "./contracts";

import { assembleAddresses } from "./addrutils.js";

export const BasMinerAddresses = {
  1: "",
  3: "0x720Da26432b6501AeD0020dA04ee67257928d9BD"
};

export const BasMinerABI = ContractsJson.BasMiner.abi;

export default {
  BasMinerAddresses: assembleAddresses(
    BasMinerAddresses,
    ContractsJson.BasMiner.networks
  ),
  BasMinerABI
};
