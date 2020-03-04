import { checkSupport } from '@/bizlib/networks'
import Cookies from 'js-cookie'

const getters = {
  currentLang:state =>{
    return state.lang;
  },
  //don't move ,this use by check metamask auth
  checkMetamaskEnable:(state) =>{
    const chainId = state.web3.chainId
    const wallet = state.web3.wallet
    const spFlag = checkSupport(chainId)

    return !!(state.web3.isInjected &&
      chainId && wallet && spFlag);
  },
  /**
   * change Data need check
   */
  metaMaskDisabled:(state) =>{
    const chainId = state.web3.chainId
    const wallet = state.web3.wallet
    const spFlag = checkSupport(chainId)
    if(!state.web3.isInjected || !chainId || !wallet || !spFlag){
      return true;
    }else {
      return false;
    }
  },
  /**
   * query need check
   */
  noMetaMask: (state) => {
    return !state.web3.isInjected
  },
  checkMetaMaskUnLogin:(state) =>{
    return Boolean(!state.web3.isInjected ||
      !state.web3.chainId || !state.web3.wallet)
  }
}

export default getters
