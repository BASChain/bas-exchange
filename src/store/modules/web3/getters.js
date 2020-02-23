import { getNetwork, checkSupport, getSupportNetworkNames } from "@/bizlib/networks"
import { CurrencyFormat } from '@/utils'
import { backstageEth ,getMetamaskExtensionHref } from '@/bizlib/metamask'

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
    var web3 = state.web3()
    if(state.ethBal == null) return ''
    const ethBal = web3.utils.fromWei(state.ethBal,'ether')

    return CurrencyFormat(ethBal,'0[.]0000')
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
