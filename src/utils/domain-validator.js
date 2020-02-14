
export function getDomainType(domain) {
  const type =''
  if(checkDomainLegal(domain))return 'illegal'

  if(isTopDomain(domain)) {
    return 'top'
  }

  const levels = domain.split('.').length

  return levels > 1 ? 'subdomain' :'commondomain'
}

export function isSubdomain(domain) {
  return getDomainType(domain) == 'subdomain'
}

export function checkDomainLegal(domain){
  if(typeof domain !='string') return true;
  if(domain.startsWith('.') || domain.endsWith('.'))return true;
  if(domain.includes('?') || domain.includes('/'))return v;
  return false
}
export function isOnlyEnglish (domain) {
  return RegExp(/^[0-9a-zA-Z\-\.]+$/).exec(domain) !=null
}

export function isTopDomain(domain) {
  const match = RegExp(/^[0-9a-zA-Z]{1,5}$/).exec(domain);
  return match != null;
}

export default {
  getDomainType,
  checkDomainLegal,
  isTopDomain,
  isSubdomain,
  isOnlyEnglish,
}
