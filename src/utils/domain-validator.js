
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
  if(typeof domain !=='string') return true;
  if(domain.startsWith('.') || domain.endsWith('.'))return true;
  if(domain.includes('?') || domain.includes('/'))return true;
  if(/[`~!@#$%^&*()+<>?:"{},\/;'[\]]/im.test(domain))return true;
  if(/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(domain)) return true;
  return false
}

export function isOnlyEnglish (domain) {
  return RegExp(/^[0-9a-z\-\.]+$/).exec(domain) !=null
}

/**
 * less than 5 charaters
 * @param {*} domain
 */
export function isRareDomain(domain) {
  const match = RegExp(/^[0-9a-z]{1,5}$/).exec(domain);
  return match != null;
}

export default {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  isOnlyEnglish,
}
