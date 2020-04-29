import {
  fromAscii, toAscii,
  asciiToHex,
} from 'web3-utils'

const IP_SIGN = ','


/**
 *
 * @param {*} ipv4s
 */
export function concatIP(ipv4s){
  if(!ipv4s||!ipv4s.length)return ''
  return ipv4s.join(IP_SIGN)
}

/**
 *
 * @param {*} hexStr
 */
export function asciiToString(hexStr) {
  return toAscii(hexStr);
}

export function stringToAscii(str){
  return fromAscii(str)
}

export function splitIP(str) {
  if(!str)return []
  return str.split(IP_SIGN)
}


export default {
  concatIP,
  splitIP,
  asciiToString,
  stringToAscii
};
