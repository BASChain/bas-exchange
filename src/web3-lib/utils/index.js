
//import punycode from "punycode";

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
  const Web3Utils = Web3.utils
  const basbn = new Web3Utils.BN(Web3Utils.fromWei(Web3Utils.toWei(bas+'','ether'),'wei'))
  return basbn.cmp(new Web3Utils.BN(wei,10))
}

/**
 *
 * @param {*} owner
 * @param {*} wallet
 */
export const isOwner = (owner,wallet) =>{
  if(!owner || !wallet)return false
  return owner.toLowerCase() === wallet.toLowerCase()
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
  const Web3Utils = Web3.utils
  const aliasName = Web3Utils.hexToString(aliasHex)
  const domaintext = Web3Utils.hexToString(domainHex)

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
  const Web3Utils = Web3.utils
  const basbn = new Web3Utils.BN(baswei+'',10);
  const weibn = new Web3Utils.BN(wei+'',10)
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
  const Web3Utils = Web3.utils

  return Web3Utils.fromAscii(name+'')
}

/**
 * parse bytes hex str to ascii string
 * @param {*} bytesname
 */
export function parseHexDomain(bytesname){
  const Web3Utils = Web3.utils
  if (!Web3Utils.isHex(bytesname))throw ApiErrors.INVALID_PARAMS

  if (!Web3Utils.isHexStrict(bytesname)) bytesname = '0x' + bytesname;

  try{
    const domaintext = punycode.toUnicode(Web3Utils.hexToAscii(bytesname))
    return domaintext
  }catch(ex){
    return Web3Utils.hexToAscii(bytesname)
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

  const Web3Utils = Web3.utils
  return !Web3Utils.isAddress(address)
}

/**
 * ip,cname
 * @param {*} refStrDatas [...string] or []
 * return 0x....
 */
export function confDatas2hex(refStrDatas){
  if (!refStrDatas)throw ApiErrors.PARAM_ILLEGAL
  if(!refStrDatas.length)return '0x'

  const Web3Utils = Web3.utils
  const datas = refStrDatas.map(d => Web3Utils.utf8ToHex(d + '')).map(d => d.substring(2))

  return '0x' + datas.join(dataStoreDelimiter)
}

/**
 * string return array
 * @param {*} hexstr
 */
export function hex2ConfDatas(hexstr){
  if(hexstr === undefined ) throw ApiErrors.PARAM_ILLEGAL
  if(hexstr === null)return []
  const Web3Utils = Web3.utils

  if (Web3Utils.isHex(hexstr) && Web3Utils.isHexStrict(hexstr)){
    const datas = hexstr.substring(2).split(dataStoreDelimiter)
    return datas.map(d => Web3Utils.hexToString('0x'+d))
  } else if (Web3Utils.isHex(hexstr) && !Web3Utils.isHexStrict(hexstr)){
    return (hexstr + '').split(dataStoreDelimiter).map(d => Web3Utils.hexToString('0x' + d))
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
 * string xxx|sss| sd to []
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

/**
 * expire > now false, true
 * @param {*} expire
 */
export function assertExpired(expire){
  if(!expire)return true
  const nowts = new Date().getTime()/1000
  return nowts > parseFloat(expire)
}

/**
 *
 * @param {*} expire
 * @param {*} max
 */
export function canMaxRechargeYears(expire,max){
  if(!expire || expire <=0)return max||5;
  const expireTS = expire * 1000;
  const currTS = new Date()
  if ((currTS.getTime() / 1000 - expire) > 0) return 5;

  const maxTmpTS = currTS.getTime() + (5 * 365 + 1) * 24 * 3600 * 1000;
  let maxYearTS = maxTmpTS - expireTS
  return Math.floor(maxYearTS / (365 * 24 * 3600 * 1000))
}

export function splitSubDomain(domaintext) {
  if(domaintext ===undefined || !domaintext.trim().length)
    throw `${domaintext} illegal`

  const Web3Utils = Web3.utils

  const handleText = prehandleDomain(domaintext)
  const lastIdx = handleText.lastIndexOf('.')

  if (lastIdx > 0 && lastIdx < (handleText.length -1)){
    return {
      subBytes: Web3Utils.fromAscii(handleText.substr(0, lastIdx)),
      topBytes: Web3Utils.fromAscii(handleText.substr(lastIdx + 1))
    }
  }else{
    throw `${domaintext} not sub domain`
  }
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
  punycodeMail2Ascii,
  isOwner,
  assertExpired,
  canMaxRechargeYears,
  splitSubDomain
};
