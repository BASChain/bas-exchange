/**
 * show
 */
export const CONFDATA_SHOW_SIGN = '|'
const IP_SIGN = ','

export const UtilRules = {
  IPv4: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  //IPv4:/^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$/,
  IPv6: /^[0-9A-Fa-f\:]{2,39}$/,
  hexAddress: /^((0x)?[0-9A-Fa-f]{1,160})$/,
  BCAddress:/^((0x)?[0-9A-Za-z|\-]{1,1024})$/,
  EXIPv6: /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
  SpecialCharacter: /[~!@#$%^&*()/\|,<>?"'();:+=\[\]{}]/
}

/**
 *
 * @param {*} ipv4
 */
export function validIPv4(ipv4){
  return UtilRules.IPv4.test(ipv4)
}

/**
 *
 * @param {*} ipv6
 */
export function validIPv6(ipv6){
  return UtilRules.IPv6.test(ipv6)
}

/**
 * 判断空字符串,null undefined '' return true
 * @param {*} str
 */
export function assertEmpty(str){
  console.log(str)
  if(typeof str !== 'string' && typeof str !== 'number')return true
  if(!(str+'').length)return true
  return false
}

/**
 *
 * @param {*} str
 */
export function assertEmptyOrNotHex(str){
  console.log(str)
  if (typeof str !== 'string' && typeof str !== 'number') return true
  if (!(str + '').length) return true
  return !UtilRules.hexAddress.test(str)
}

/**
 *
 * @param {*} str
 */
export function splitConfDatas(str){
  if(str === undefined ||str===null ||str =='')return []
  return str.trim().split(CONFDATA_SHOW_SIGN)
}

/**
 * 0x [0-9a-zA-z max 1024]
 * @param {*} bca
 */
export function assertNotBCA(bca){
  if(!bca)return true
  return !UtilRules.BCAddress.test(bca)
}
/**
 *
 * @param {*} datas
 */
export function concatConfDatas(datas) {
  if(!datas || !datas.length)return ''

  return datas.join(CONFDATA_SHOW_SIGN)
}

/**
 * datas : [...{typ,val}]
 * @param {object} datas
 */
export function assertHasRepeatRefData(datas){
  if (!datas || datas.length <= 1) return false

  const inputLen = datas.length
  let ko = {}
  let rets = datas.reduce((cur,next) =>{
    const val = next.val
    console.log('val>>>',val,typeof val)
    ko[next.val.trim()] ? '' : ko[next.val.trim()] = true && cur.push(next)
    return cur
  },[])
  return inputLen !== rets.length
}

export default {
  splitConfDatas,
  concatConfDatas,
  validIPv4,
  validIPv6,
  assertHasRepeatRefData
};
