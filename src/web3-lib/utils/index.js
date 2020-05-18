import {
  fromWei, toWei, BN,
  fromAscii, isHex, isHexStrict,
  hexToAscii,
} from 'web3-utils'
import punycode from "punycode";

import * as ApiErrors from '../api-errors.js'

export const MinGasWei = 100000;

/**
 * compare bas > weibn 1, = 0 ,< -1
 * @param {*} bas ether number or string
 * @param {*} wei bn or wei
 */
export const compareBas2Wei = (bas,wei) =>{
  const basbn = new BN(fromWei(toWei(bas+'','ether'),'wei'))
  console.log(basbn.toString());
  return basbn.cmp(new BN(wei,10))
}

/**
 * baswei > wei  1 ; = 0 ; < -1
 * @param {*} baswei string or number
 * @param {*} wei string or number
 */
export const compareWei2Wei = (baswei, wei) => {
  const basbn = new BN(baswei+'',10);
  const weibn = new BN(wei+'',10)
  console.log(basbn.toString());
  return basbn.cmp(weibn);
};

/**
 * trim>toLowerCase>punycode toAscii
 * @param {*} name
 */
export function prehandleDomain(name){
  if(name === undefined ) throw 'Illegal name.'
  name = name +''
  const resname = name.trim().toLowerCase();
  return punycode.toASCII(resname);
}

/**
 * 将 number or string to ascii string
 * @param {*} name
 */
export function domain2Ascii(name) {
  if(typeof name === 'undefined')throw 'null illegal.'
  if(typeof name === 'number')name = name+''

  return fromAscii(name+'')
}

/**
 * parse bytes hex str to ascii string
 * @param {*} bytesname
 */
export function parseHexDomain(bytesname){
  if (!isHex(bytesname))throw ApiErrors.INVALID_PARAMS

  if (!isHexStrict(bytesname)) bytesname = '0x' + bytesname;

  try{
    const domaintext = punycode.toUnicode(hexToAscii(bytesname))
    return domaintext
  }catch(ex){
    throw `${ApiErrors.UNKNOWN}: parse domain ${bytesname} error.`
  }
}
/**
 *
 * @param {*} hash
 */
export function notNullHash(hash){
  return hash && hash !='0x0000000000000000000000000000000000000000000000000000000000000000'
}

export default {
  MinGasWei,
  compareBas2Wei,
  compareWei2Wei,
  prehandleDomain,
  domain2Ascii,
  parseHexDomain,
  notNullHash,
};
