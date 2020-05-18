import {
  fromWei, toWei, BN,
  fromAscii, isHex, isHexStrict,
  hexToAscii,
  utf8ToHex, hexToString
} from 'web3-utils'
import punycode from "punycode";

import * as ApiErrors from '../api-errors.js'

export const MinGasWei = 100000;

export const dataStoreDelimiter = '7f';
export const dataShowDelimiter = '|';

/**
 * compare bas > weibn 1, = 0 ,< -1
 * @param {*} bas ether number or string
 * @param {*} wei bn or wei
 */
export const compareBas2Wei = (bas,wei) =>{
  const basbn = new BN(fromWei(toWei(bas+'','ether'),'wei'))
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
    return hexToAscii(bytesname)
    //throw `${ApiErrors.UNKNOWN}: parse domain ${bytesname} error.`
  }
}
/**
 *
 * @param {*} hash
 */
export function notNullHash(hash){
  return hash && hash !='0x0000000000000000000000000000000000000000000000000000000000000000'
}



/**
 * ip,cname
 * @param {*} refStrDatas [...string] or []
 * return 0x....
 */
export function confDatas2hex(refStrDatas){
  if (!refStrDatas)throw ApiErrors.PARAM_ILLEGAL
  if(!refStrDatas.length)return '0x'

  const datas = refStrDatas.map(d => utf8ToHex(d + '')).map(d => d.substring(2))

  return '0x' + datas.join(dataStoreDelimiter)
}

/**
 * string return array
 * @param {*} hexstr
 */
export function hex2ConfDatas(hexstr){
  if(hexstr === undefined ) throw ApiErrors.PARAM_ILLEGAL
  if(hexstr === null)return []

  if (isHex(hexstr) && isHexStrict(hexstr)){
    const datas = hexstr.substring(2).split(dataStoreDelimiter)
    return datas.map(d => hexToString('0x'+d))
  } else if (isHex(hexstr) && !isHexStrict(hexstr)){
    return (hexstr+'').split(dataStoreDelimiter).map(d => hexToString('0x' + d))
  }else{
    throw ApiErrors.PARAM_ILLEGAL
  }
}

/**
 * 0x..7f...7f.. > xsf|dfs|
 * hexStr 2 utf8 string
 * @param {*} hexstr
 */
export function hex2confDataStr(hexstr){
  if (hexstr===null)return ''
  return confDatas2Str(hex2ConfDatas(hexstr))
}

/**
 *
 * @param {*} confDatas
 */
export function confDatas2Str(confDatas){
  if (!confDatas || !confDatas.length) return ''
  return confDatas.join(dataShowDelimiter)
}

/**
 *
 * @param {*} str
 */
export function str2ConfDatas(str){
  if (typeof str !== 'string' && typeof str !== 'number')throw ApiErrors.PARAM_ILLEGAL
  return (str + '').split(dataShowDelimiter)
}

/**
 *
 * @param {*} domaintext
 */
export function isRare(domaintext){
  return /^[0-9a-z]{1,6}$/.test(domaintext)
}

export default {
  MinGasWei,
  compareBas2Wei,
  compareWei2Wei,
  prehandleDomain,
  domain2Ascii,
  parseHexDomain,
  notNullHash,
  isRare,
};
