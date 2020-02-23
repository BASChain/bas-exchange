import errors from './error-types'

export const MetamaskExtensions = {
  chrome:"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
  firefox:"https://addons.mozilla.org/zh-CN/firefox/addon/ether-metamask/?src=search",
  opera:"https://addons.opera.com/zh-cn/extensions/details/metamask/"
}

export function getMetamaskExtensionHref(browser){
  return MetamaskExtensions[browser] ||''
}

export function translateError(inCode){
  if(inCode == undefined) return false;
  return errors.find(item => (item.code == inCode && item.i18n))
}

export function isMetaMask(){
  return Boolean(window.ethereum && window.ethereum.isMetaMask)
}

export function backstageEth(){
  if(window.ethereum){
    return {
      chainId:window.ethereum.chainId,
      selectedAddress:window.ethereum.selectedAddress
    }
  }
  return null
}

export default {
  isMetaMask,
  backstageEth,
  MetamaskExtensions,
  getMetamaskExtensionHref,
  translateError
}
