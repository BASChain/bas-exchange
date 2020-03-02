import numeral from 'numeral'
import DateFormat from 'fast-date-format'


export const STD_DATEFORMAT = "YYYY-MM-DD"


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
    dt = new Date(dt)
  }
  let dataFormat = new DateFormat(format||STD_DATEFORMAT)

  return dataFormat.format(dt)
}

/**
 * 校验是否过期
 * @param {String Number} seconds
 */
export const ValidExpired = (seconds) =>{
  if(seconds === undefined || !seconds) return false;
  let now = (new Date().getTime())/1000;
  return (now - parseInt(seconds)) >= 0;
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
    bn = bn.toString();
  }
  const _format = format ||'0[.]00'

  return numeral(bn).format(_format)
}

/**
 * @depared
 * error translate
 * @param {*} str
 */
export const toASCII = (str) =>{
  if(!str||str.length == 0)return "0x00"
  return "0x" + str.split("").map(e => e.charCodeAt()).reduce((a,b)=> a.toString(16)+b.toString(16))
}
/**
 * @depared
 * error translate
 * @param {*} ascii
 */
export const asciiToStr = (ascii)=>{
  charCode = [];
  for (i=2;i<ascii.length-1;i+=2){
      charCode.push("0x"+ascii[i]+ascii[i+1]);
  }
  return charCode.map((e)=>String.fromCharCode(e)).reduce((a,b)=>a+b);
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

export default {
  CurrencyFormat,
  dateFormat,
  diffDays,
  diffYears,
  toASCII,
  bytesToStr,
  intToDate,
  hex2IPv4,
  hex2IPv6,
  IPv6ToHex,
  IPv4ToHex,
  asciiToStr,
}
