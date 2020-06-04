import { checkSupport, getNetworkName } from '@/web3-lib/networks'

const getters = {
  currentLang:state =>{
    return state.lang;
  },
  //don't move ,this use by check metamask auth
  /**
   * change data use this validate
   * TODO remove or update dapp
   */
  checkMetamaskEnable:(state) =>{
    const chainId = state.dapp.chainId
    const wallet = state.dapp.wallet
    const spFlag = checkSupport(chainId)

    return !!(state.dapp.injected && chainId && wallet && spFlag);
  },
  /**
   * change Data need check
   */
  metaMaskDisabled:(state) =>{
    const chainId = state.dapp.chainId
    const wallet = state.dapp.wallet
    const spFlag = checkSupport(chainId)
    if (!state.dapp.injected || !chainId || !wallet || !spFlag){
      return true;
    }else {
      return false;
    }
  },
  /**
   * query need check
   */
  hasMetaMask:(state)=>{
    if (window.ethereum && window.ethereum.isMetaMask){
      return window.ethereum.isMetaMask
    }else{
      return false;
    }
  },
  /**
   * web3State
   */
  web3State:(state)=>{
    return {
      injected:Boolean(state.dapp.injected),
      chainId:state.dapp.chainId,
      wallet:state.dapp.wallet,
      network: getNetworkName(state.dapp.chainId)
    }
  },
  domainYearItems: state => state.dapp.domainYearItems
}

export default getters
