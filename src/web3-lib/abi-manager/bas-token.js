import BasTokenJson from './contracts/BasToken.json'
import {getLocalAddress} from './index'

/**
 * sun: 0xb9291744e91fAd68060D7Cbfc702f13F64E6E7C5
 * 0309: 0x9d0314f9Bacd569DCB22276867AAEeE1C8A87614
 */
export const BasTokenAddresses = {
         1: "0x105B1413461394148023FEB5bE3b4307448872d5",
         3: "0x9d0314f9Bacd569DCB22276867AAEeE1C8A87614",
         1337: getLocalAddress(BasTokenJson.networks)
       };

export const BasTokenABI = BasTokenJson.abi

export default {
  BasTokenAddresses,
  BasTokenABI,
};
