import { checkSupport } from '@/bizlib/networks'
const getters = {
  currentLang:state =>state.currentLang,
  checkMetamaskEnable:(state) =>{
    const chainId = state.web3.chainId
    const wallet = state.web3.wallet
    const spFlag = checkSupport(chainId)

    return !!(state.web3.isInjected &&
      chainId && wallet && spFlag);
  },
  checkMetaMaskUnLogin:(state) =>{
    return Boolean(!state.web3.isInjected ||
      !state.web3.chainId || !state.web3.wallet)
  },
  getBrowserName:(state) =>{
    const name = state.browser.name
    return name ? name.toLowerCase() : ''
  }
}

export default getters
