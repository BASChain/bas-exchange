import { getNetwork,checkSupport } from "@/bizlib/networks"

const getters = {
  hasInjected:state => {return state.isInjected},
  getNetwork:state =>{
    return getNetwork(state.chainId||'')
  },
  getNetworkName:state =>{
    const nw = getNetwork(state.chainId)
    return nw ? nw.name : ''
  },
  getEthBalance:state =>{
    const web3 = state.web3()
    return state.ethBal != null ? web3.utils.fromWei(state.ethBal,'ether') : ''
  },
  metamaskConnected:state => {
    return state.isInjected == true && state.chainId != null && state.wallet != null;
  },
  checkNetworkSupported:state => {
    if(state.chainId == null) return false;
    return checkSupport(state.chainId)
  }
}

export default getters
