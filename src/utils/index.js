import numeral from 'numeral'
import DateFormat from 'fast-date-format'
import punycode from 'punycode'
import {fromWei,toWei,BN} from 'web3-utils'


export const STD_DATEFORMAT = "YYYY-MM-DD"
export const TS_DATEFORMAT = "YYYY-MM-DD HH:mm:ss"

/**
 * trim,toLowerCase punycode
 * @param {*} domain
 */
export function handleDomain(domain){
  //console.log(domain)
  domain = domain+''
  let text = domain.trim().toLowerCase()
  return punycode.toASCII(text)
}
/**
 * punycode ascii toUnicode
 * @param {*} domain
 */
export function toUnicodeDomain(domain){
  if(typeof domain === 'undefined')return ''
  if(!domain.trim().length)return ''

  return punycode.toUnicode(domain.trim())
}

export function etherToWeiStr(str){
  return fromWei(str,'ether')
}



export function compressAddr(address) {
  if(!address || !address.length)return ''
  const len = address.length
  if (len<=10)return address

  let s = `${address.substr(0,6)}...${address.substr(len-4)}`
  return s
}

export function getCustomPrice(
  subGasWei,openApplied,
  isCustomed,customPriceWei,
  decimals)
{

  decimals = decimals ||18
  subGasWei = subGasWei || 4*10**18;
  if(!openApplied || !isCustomed ||!customPriceWei){
    return subGasWei / (10 ** decimals)
  }
  return customPriceWei/(10**decimals)
}

export const transWei = (wei,decimals)=> {
  if(!wei)return 0;
  decimals = decimals ||18;
  return wei/(10**decimals)
}

/**
 * wei to bas
 * @param {*} wei string or number
 */
export function wei2Bas(wei){
  if(wei === undefined)return 0
  return fromWei(wei+'','ether')
}

/**
 * bas to wei string
 * @param {*} bas
 */
export function bas2Wei(bas){
  if(bas===undefined)return 0;
  return toWei(bas+'','ether')
}

/**
 *
 * @param {string,number(ms),Date} dt
 * @param {*} format
 * YYYY MM DD mm ss
 * SSS 000...999
 * DDDD 001..365
 * @see https://www.npmjs.com/package/fast-date-format
 */
export const dateFormat = (dt,format) =>{
  if(!dt)return ''
  if(typeof dt ==='number' || typeof dt === 'string'){
    dt = new Date(dt*1000)
  }
  let dataFormat = new DateFormat(format||STD_DATEFORMAT)
  return dataFormat.format(dt)
}

export function transBAS2Wei(bas){
  bas = bas+'';
  let suffix = "000000000000000000";
  if(bas.indexOf('.')!=-1){
    let pre = parseInt(bas)
    let digits = bas.substr(bas.indexOf('.')+1)
    let append = ''
    if(digits.length>=18){
      append = digits.substr(0,18)
    }else{
      append = digits + suffix.substr(digits.length)
    }
    return parseInt(pre) !== 0 ? pre +''+append : append
  }else {
    return bas+suffix;
  }
}

/**
 * 校验是否过期
 * @param {*} expire
 */
export function hasExpired(expire) {
  if (!expire) return true;
  let cts = (new Date().getTime()) / 1000;
  return parseFloat(expire) - parseFloat(cts) <= 0.00
}
/**
 * ms
 * @param {*} dtend
 * @param {*} dtstart
 */
export const diffDays = (dtend,dtstart) =>{
  if(!dtend )return 0;
  if(!dtstart)dtstart = new Date().getTime()
  return Math.floor((dtend-dtstart)/(24*3600*1000))
}

export const diffYears = (dtend,dtstart) =>{
  if(!dtend )return 0;
  if(!dtstart)dtstart = new Date().getTime()
  return Math.floor((dtend-dtstart)/(24*3600*1000*365))
}

/**
 * bns1 >= bns2
 * @param {*} bns1
 * @param {*} bns2
 * @param {*} decimals
 */
export const diffBn = (bns1,bns2,decimals) =>{
  if(!bns1 || !bns2)return false;
  decimals = decimals || 18;
  return parseInt(bns1/(10**18)) >= parseInt(bns2/(10**18))
}

export const CurrencyFormat = (bn,format)=>{
  if(typeof bn === 'Object'){
    bn = bn.toString(10);
  }
  const _format = format ||'0[.]00'

  return numeral(bn).format(_format)
}

/**
 *
 * @param {*} valWei
 * @param {*} decimals
 */
export function wei2Float(valWei,decimals){
  if(!valWei)return ''
  if(!decimals)decimals = 18
  let val = valWei / (10**decimals)
  if((valWei+'').length<14)return val.toString()
  const _format = '0[.]00'
  return numeral(val).format(_format)
}

export function wei2BasFormat(valWei, decimals) {
  if (typeof valWei === 'undefined') return 0
  if (!decimals) decimals = 18
  let val = valWei / (10 ** decimals)
  //if ((valWei + '').length < 14) return val.toString()
  const _format = '0[.]0000'
  return numeral(val).format(_format)
}

/**
 * bnf1 >= bnf2
 * @param {*} bnf1
 * @param {*} bnf2
 * @param {*} decimals
 */
export const diffBnFloat = (bnf1,bnf2,decimals) =>{
  if(!bnf1|| !bnf2) return false;
  decimals = decimals || 18;
  return parseFloat(bnf1 / (10 ** decimals)) >= parseFloat(bnf2 / (10 ** decimals))
}

/**
 *
 * @param {*} str
 */
export const numThousandsFormat = (str)=>{
  let ori = str;
  str = numeral(str).format('0,0.[00]')
  if(str == 'NaN')return ori
  return str;
}


export function toNonExponential(num) {
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

/**
 * @depared
 * error translate
 * @param {*} str
 */
export const toASCII = (str) =>{
  if (str.length == 0) {
    return "0x00"
  } else {
    return str.split("").map(e => e.charCodeAt()).reduce((a, b) => a + b.toString(16), "0x");
  }
}
/**
 * @depared
 * error translate
 * @param {*} ascii
 */
export const asciiToStr = (ascii)=>{
  charCode = [];
  for (i = 2; i < ascii.length - 1; i += 2) {
    charCode.push("0x" + ascii[i] + ascii[i + 1]);
  }
  return charCode.map((e) => String.fromCharCode(e)).reduce((a, b) => a + b);
}

/**
 * bytes to String
 * @param {bytes} ascii
 */
export const bytesToStr = (ascii) =>{
  const charCodes = []
  for(var i=2;i<ascii.length-1;i +=2){
    charCodes.push("0x"+ascii[i]+ascii[i+1])
  }
  return charCodes.map(e => String.fromCharCode(e)).reduce((a,b)=>a+b)
}

export const intToDate = (ts)=>{
  return new Date(ts*1000)
}

export const validBCAddr = (addr) =>{
  if(addr !== undefined){
    return /^(0x)?[A-Fa-f0-9]{30,40}$/.test(addr);
  }
}

/**IPV4 IPV6 */
export const IPv4ToHex = (ip) =>{
  var slices = ip.split(".");
  if (slices.length!=4){
    throw new Error("not a valid ipv4 address");
  }
  var convert = (slices.map(element => {
    if(isNaN(element)||element<0 || element>255){
      throw new Error("not a valid ipv4 address");
    }else{
      var temp = parseInt(element).toString(16);
      temp = temp.length==1?"0"+temp:temp;
      return temp;
    }
  })).join("");
  return '0x'+convert;
}

/**
 * trans IPv6 to hex no 0x
 */
export const IPv6ToHex = (ipv6) =>{
  if(!UtilRules['EXIPv6'].test(ipv6))throw new Error('IPv6 incorrect format.')

  let ipv6Ex = ipv6Padding(ipv6)
  let striped = ipv6Ex.replace(/:/g,"");
  if(striped!=striped.match(/^[0-9a-fA-F]{32}$/g)[0]){
    throw new Error("not a valid ipv6 address / shorted version not allowed");
  }
  return '0x'+striped;

  function ipv6Padding(ip){
    let zips = ip.split('::');
    if(zips.length == 1&&zips[0].split(':').length == 8){
      return ip.split(':').map(x =>
       '0000'.substring((x+'').length) + x
      ).join(':');
    } else if(zips.length == 2){
      return simplifyIPv6Expand(zips);
    }else {
      throw new Error('IPv6 incorrect format.');
    }
  }
  function simplifyIPv6Expand(zips){
    let outarr = [8],
      beforeCount = zips[0].split(':').length,
      afterCount = zips[1].split(':').length,
      simplify = [];

    let needCount = 8 - beforeCount - afterCount;
    for(var i = 0 ; i < needCount ; i++){
      simplify[i] = '0';
    }

    outarr = (zips[0]+':'+simplify.join(':')+':'+zips[1]).split(':');
    return outarr.map(x =>'0000'.substring((x+'').length) + x).join(':');
  }
}

export const UtilRules = {
  IPv4:/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  //IPv4:/^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$/,
  IPv6:/^[0-9A-Fa-f\:]{2,39}$/,
  hexAddress:/^((0x)?[0-9A-Fa-f]{1,64})$/,
  EXIPv6:/^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/
}

export function validIPv4(v) {
  return UtilRules.IPv4.test(v)
}
export function validIPv6(v) {
  return UtilRules.IPv6.test(v)
}

/**
 *
 * @param {*} hex
 */
export function hex2IPv4(hex) {
  if(!hex)return ''
  if(/^(0x)?[0]{8}$/.test(hex))return ''
  let _hexStr = hex+'';
  if(hex.startsWith('0x'))_hexStr = hex.substr(2)
  let tmp = [4]
  for (var i = 0;i<4;i++){
    tmp[i] = parseInt(_hexStr.substring(i*2,(i+1)*2),16)
  }
  return tmp.join('.')
}
/**
 *
 * @param {*} hex
 */
export function hex2IPv6(hex){
  if(!hex)return ''
  if(/^(0x)?[0]{32}$/.test(hex))return '';
  let _hexStr = hex+'';
  if(hex.startsWith('0x')) _hexStr = hex.substr(2);
  let tmp = [8]
  for (var i = 0;i<8;i++){
    tmp[i] = _hexStr.substring(i*4,(i+1)*4)
  }
  return tmp.join(':')
}

export function regTest(r,v){
  if(!UtilRules[r] || !v)return false
  return UtilRules[r].test(v)
}

/**
 *
 */
export async function metaMaskUnLock() {
  if (!ethereum) return Promise.resolve(false)
  return await ethereum._metamask.isUnLock()
}

/**
 *
 * @param {*} domain
 */
export function handleEnDomain(domain) {
  let text = domain.trim().toLowerCase()
  return punycode.toASCII(text)
}
/**
 *
 * @param {*} domain
 */
export function handleDeDomain(domain) {
  let text = domain.trim().toLowerCase()
  return punycode.toUnicode(text)
}


/**
 * 判断地址
 * @param {*} wallet
 * @param {*} owner
 */
export function isOwner(address, wallet){
  if (!address) return false;
  if(!wallet){
    wallet = (window.ethereum && window.ethereum.selectedAddress) ?
    window.ethereum.selectedAddress : ''
  }
  if (!wallet) return false;
  return wallet.toLocaleLowerCase() === address.toLocaleLowerCase()
}

/**
 * splice top
 * @param {*} subdomain
 */
export function getTopFromSub(subdomain){
  if(!subdomain)return ''
  if(subdomain.startsWith('.') || subdomain.endsWith('.'))return ''
  let last = subdomain.lastIndexOf('.')
  return subdomain.substr(last+1)
}
/**
 *
 * @param {*} num
 * @param {*} digits
 */
export function wei2NumberStr(num, digits) {
  // 正则匹配小数科学记数法
  if (/^(\d+(?:\.\d+)?)(e)([\-]?\d+)$/.test(num)) {
    // 正则匹配小数点最末尾的0
    var temp = /^(\d{1,}(?:,\d{3})*\.(?:0*[1-9]+)?)(0*)?$/.exec(num.toFixed(digits));
    if (temp) {
      return temp[1];
    } else {
      return num.toFixed(digits)
    }
  } else {
    return "" + num
  }
}
/**
 *
 * @param {*} expire
 */
export function maxRechageYears(expire) {
  if(!expire)return 5;
  const expireTS = expire *1000;
  const currTS = new Date()
  if((currTS.getTime()/1000 - expire) > 0 )return 5;

  // const expireYear = new Date(expire*1000).getFullYear()
  // const expireDays = Math.ceil((new Date(expire * 1000) - new Date(expireYear+""))/(24*3600*1000)) + 1

  // const currDays = Math.ceil((currTS.getTime() - new Date(currTS.getFullYear().toString()))/(24*3600*1000)) +1
  // console.log('expireDays>>>>', expireYear, expireDays, currDays)

  const maxTmpTS = currTS.getTime() + (5*365+1)*24*3600*1000;
  let maxYearTS = maxTmpTS - expireTS
  return Math.floor(maxYearTS/(365*24*3600*1000))
}

/**
 * tran  a BN to Ether string
 * @param {*} bn
 * @param {*} format
 */
export function hexBN2Ether(bn,format){
  const _format = format || "0[.]00";
  if(!bn)return numeral("0").format(_format);

  const val = fromWei(bn.toString(16),'ether')

  return numeral(val).format(_format);
}


export default {
  CurrencyFormat,
  dateFormat,
  diffDays,
  diffYears,
  diffBn,
  diffBnFloat,
  toASCII,
  bytesToStr,
  intToDate,
  hex2IPv4,
  hex2IPv6,
  IPv6ToHex,
  IPv4ToHex,
  asciiToStr,
  handleDomain,
  toUnicodeDomain,
  hasExpired,
  getTopFromSub,
  compressAddr,
  toNonExponential,
  wei2NumberStr,
  transBAS2Wei,
  numThousandsFormat,
  wei2BasFormat,
  maxRechageYears,
}
