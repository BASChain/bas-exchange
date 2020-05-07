import BasOANNJson from "./contracts/BasOANN.json";
import { assembleAddresses } from "./addrutils.js";
/**
 * l-r:0x948aaD089241c7D8E04F030b071ABa3DC49c30e3
 * s-r:
 */
export const BasOANNAddresses = {
  1: "0x6a76585B037988281Aa2c80E6E42d689bA940Cef",
  3: "0xe124EA51E453e14F4D3f131bd28345382Ff39b37"
};

export const BasOANNABI = BasOANNJson.abi

export default {
  BasOANNAddresses: assembleAddresses(BasOANNAddresses,BasOANNJson.networks),
  BasOANNABI
};
