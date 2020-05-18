import BasOANNJson from "./contracts/BasOANN.json";
import { assembleAddresses } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0x948aaD089241c7D8E04F030b071ABa3DC49c30e3
 * s-r:
 */

export const BasOANNABI = BasOANNJson.abi

export default {
  BasOANNAddresses: assembleAddresses(ContractNames.BasOANN, BasOANNJson.networks),
  BasOANNABI
};
