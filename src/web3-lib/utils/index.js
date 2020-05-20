import {
  fromWei, toWei, BN,
  fromAscii, isHex, isHexStrict,
  hexToAscii,
  utf8ToHex, hexToString,
  isAddress,
} from 'web3-utils'
import punycode from "punycode";

import * as ApiErrors from '../api-errors.js'

export const MinGasWei = 100000;

export const dataStoreDelimiter = '7f';
export const dataShowDelimiter = '|';
export const mailConcatChar='@'

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
 *
 * @param {*} fulltext
 */
export function punycodeMail2Ascii(fulltext) {
  if(typeof fulltext !== 'string') throw 'utils puncode error:fulltext  need string'
  return punycode.toASCII(fulltext)
}

/**
 *
 * @param {*} aliasHex
 * @param {*} domainHex
 */
export function parseHex2Mailtext(aliasHex,domainHex){
  const aliasName = hexToString(aliasHex)
  const domaintext = hexToString(domainHex)

  return parseStr2Mailtext(aliasName, domaintext)
}

/**
 * return a unicode string
 * @param {*} aliasName ascii string
 * @param {*} domaintext ascii string
 */
export function parseStr2Mailtext(aliasName,domaintext){
  if(typeof aliasName !== 'string' || typeof domaintext !== 'string')throw 'parameters lost:' +`${typeof aliasName} ,${typeof domaintext}`
  return punycode.toUnicode(`${aliasName}${mailConcatChar}${domaintext}`)
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
 * Illegal address or zero address return true
 * else return false
 * @param {*} address
 */
export function assertNullAddress(address){
  if(!address)return true
  if (address.toLowerCase() === '0x0000000000000000000000000000000000000000')return true;
  return !isAddress(address)
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

/**
 * only string or number
 * @param {*} arg
 */
export function assertNullParameter(arg){
  if(typeof arg === 'undefined')return true
  if(typeof arg !== 'number' && typeof arg !== 'string')return true
  if(!(arg+'').trim().length)return true
  return false
}

export default {
  MinGasWei,
  mailConcatChar,
  compareBas2Wei,
  compareWei2Wei,
  prehandleDomain,
  domain2Ascii,
  parseHexDomain,
  notNullHash,
  isRare,
  assertNullAddress,
  assertNullParameter,
  punycodeMail2Ascii
};
