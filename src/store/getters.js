import { checkSupport } from '@/bizlib/networks'
import { isMetaMask } from '@/bizlib/metamask'

const getters = {
  currentLang:state =>state.currentLang,
  //don't move ,this use by check metamask auth
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
  isMetaMask:(state) => {
    return state.web3.isInjected
  }
}

export default getters
