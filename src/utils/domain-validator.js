/**
 * See Validator.js
 * this file will depared
 */
//import punycode from 'punycode'
import VErrCodes from './error-codes'

export function getDomainType(domain) {
  const type =''
  if(checkDomainIllegal(domain))return 'illegal'

  if(isRareDomain(domain)) {
    return 'raredomain'
  }

  const levels = domain.split('.').length

  return levels > 1 ? 'subdomain' :'topdomain'
}

export function isSubdomain(domain) {
  return getDomainType(domain) == 'subdomain'
}

/**
 * if sub return ''
 * @param {*} domain
 */
export function getTopDomain(domain){
  if( getDomainType(domain) !=='subdomain') return '';
  let pos = domain.lastIndexOf('.')
  return domain.substr(pos+1)
}
/**
 *
 * @param {*} domain
 */
export function splitTopDomain(domain) {
  if(!domain)return ''
  let pos = domain.lastIndexOf('.');
  return pos >0 ? domain.substr(pos+1) : domain ;
}
/**
 *
 * @param {string} fulldomain
 * @returns {domain,top}
 *
 */
export function getSplitDomain(fulldomain){
  if( getDomainType(fulldomain) !=='subdomain') {
    return {
      domain:fulldomain,
      top:''
    }
  }else{
    let pos = fulldomain.lastIndexOf('.')
    return {
      domain:fulldomain.substr(0,pos),
      top:fulldomain.substr(pos+1)
    }
  }
}

/**
 *
 * @param {*} domain
 */
export function checkDomainIllegal(domain){
  if(typeof domain !=='string') return VErrCodes.V100000;
  let transText = punycode.toASCII(domain);

  if (transText.toString().length > 63) return VErrCodes.V100001;
  if (domain.startsWith('.') || domain.endsWith('.'))
    return VErrCodes.V100003;

  if (domain.match(/\./ig) && domain.match(/\./ig).length>1){
    //console.log('match>>>>>>>>', domain.match(/\./ig).length > 1)
    return VErrCodes.V100003;
  }

  if (domain.includes('?') || domain.includes('/'))
    return VErrCodes.V100002;
  if (/[`~!@#$%^&*()+<>?:"{},\/;'[\]]/im.test(domain))
    return VErrCodes.V100002;
  if (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(domain))
    return VErrCodes.V100002;
  return false
}

export function isOnlyEnglish (domain) {
  return RegExp(/^[0-9a-zA-Z\-\.]+$/).exec(domain) !=null
}

/**
 * less than 5 charaters
 * @param {*} domain
 */
export function isRareDomain(domain) {
  const match = RegExp(/^[0-9a-zA-Z]{1,5}$/).exec(domain);
  return match != null;
}

export default {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  isOnlyEnglish,
}
