import { checkSupport } from '@/bizlib/networks'
import { isMetaMask } from '@/bizlib/metamask'

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
  },
  isMetaMask:(state) => {
    return state.web3.isInjected
  }
}

export default getters
