import punycode from 'punycode'
import Codes from './error-codes'
import { getRule, getDomainRules } from './rules'

export const MAX_BILLON_VOL = 1000000000.00


export function CheckLegal(text) {
  //非法
  if(text === undefined || text.trim().length==0)
    throw Codes.V100000
  if (text.startsWith('.') || text.endsWith('.')) throw Codes.V100002
  if(/[A-Z]+/.test(text))throw Codes.V100004
  let encodeText = punycode.toASCII(text)
  if(encodeText.length > 63) throw Codes.V100001
  if (text.indexOf(' ') >= 0) throw Codes.V100002
  if (!checkDotRuleForSub(text)) throw Codes.V100000
  let SpecialEn = getRule('specialEn')
  if (SpecialEn.expr.test(text))throw Codes.V100002
  if (getRule('specialLocal').expr.test(text)) throw Codes.V100002

  //let DotTimes = getRule('dotTimes')
 // if (text.match(DotTimes.expr) && text.match(DotTimes.expr).length > 1) throw Codes.V100003
  return true
}

/**
 *
 * 校验 不允许含有 .
 * @param {*} text
 */
export function CheckSearchLegal(text,isSub){
  if (text === undefined || text.trim().length == 0)
    throw Codes.V100000
  let encodeText = punycode.toASCII(text)
  if (encodeText.length > 63) throw Codes.V100001
  if (text.indexOf(' ') >= 0) throw Codes.V100002
  let SpecialEn = getRule('specialEn')
  if (SpecialEn.expr.test(text)) throw Codes.V100002
  if (getRule('specialLocal').expr.test(text)) throw Codes.V100002

  let DotTimes = getRule('dotTimes')
  if(isSub){
    if (!checkDotRuleForSub(text)) throw Codes.V100000
    //if (text.match(DotTimes.expr) && text.match(DotTimes.expr).length > 1) throw Codes.V100003
  }else{
    if (text.match(DotTimes.expr)) throw Codes.V100002
  }

  return true
}

function checkDotRuleForSub(text){
  const arr = text.split('.')
  if(arr.length>1){
    for(var i = 0;i<arr.length;i++){
      if(arr[i]=='')return false;
    }
  }
  return true;
}

/**
 * Market Search
 * @param {*} text
 */
export function CheckSearchMarketIllegal(text){
  if (text === undefined || text.trim().length == 0)
    throw Codes.V100000
  if (text.indexOf(' ') >= 0) throw Codes.V100002
  let SpecialEn = getRule('specialEn')
  if (SpecialEn.expr.test(text)) throw Codes.V100002
  if (getRule('specialLocal').expr.test(text)) throw Codes.V100002
  return true
}

export function isSub(text){
  let rule = getRule('dotTimes')
  return text.match(rule.expr) && text.match(rule.expr).length > 0
}

export function isTop(text){
  if(text===undefined || text.trim().length==0)return false;
  return text.indexOf('.') < 0
}

export function isRareTop(text){
  let rare = getRule('isRare')
  return rare.expr.test(text)
}

/**
 *
 * @param {*} domain
 */
export function domainSplit(domain){
  if(domain ==='')return null
  const pos = domain.lastIndexOf('.');
  if(pos<0)return null

  return {
    subtext: domain.substr(0,pos),
    toptext:domain.substr(pos+1)
  }
}

export function getDomainType(text){
  try{
    let flag = CheckLegal(text)
    //console.log(text,flag)
    let val  = text.trim()

    if (isSub(val)){
      return 'subdomain'
    }
    if (isRareTop(val))
      return 'raretop'
    if (isTop(val))
      return 'commontop'

    return 'illegal'
  }catch(ex){
    console.log(text, ex)
    return 'illegal'
  }
}

export function getDomainTypeNoIllegal(text) {
  try {
    let flag = CheckLegal(text)
    //console.log(text,flag)
    let val = text.trim()

    if (isSub(val)) {
      return 'subdomain'
    }
    if (isRareTop(val))
      return 'raretop'
    if (isTop(val))
      return 'commontop'

    return 'illegal'
  } catch (ex) {
    console.log(text, ex)
    return 'SpaceString'
  }
}

/**
 *
 * @param {*} text
 */
export function getDomainTopType(text) {
  try {
    let flag = CheckLegal(text)
    console.log(text, flag)
    let val = text.trim()

    if (isSub(val)) {
      return 'illegal'
    }
    if (isRareTop(val))
      return 'raretop'
    if (isTop(val))
      return 'commontop'

    return 'illegal'
  } catch (ex) {
    console.log(text, ex)
    return 'illegal'
  }
}

/**
 * validated number >= 0
 *
 * @param {*} num
 */
export function validPositiveNumber(num){
  const positiveRegex = getRule('positiveNumber')
  return positiveRegex.expr.test(num)
}

/**
 *
 * @param {*} num
 */
export function validBetweenZero2Billion(num){
  const positiveRegex = getRule('positiveNumber')
  const flag = positiveRegex.expr.test(num)
  if(!flag) return false
  return parseFloat(num) <= MAX_BILLON_VOL
}

export default {
  CheckLegal,
  isRareTop,
  isTop,
  isSub,
  getDomainType,
  CheckSearchMarketIllegal,
}
