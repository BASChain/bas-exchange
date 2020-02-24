import { getNetwork, checkSupport, getSupportNetworkNames } from "@/bizlib/networks"
import { CurrencyFormat } from '@/utils'
import { backstageEth ,getMetamaskExtensionHref } from '@/bizlib/metamask'

const getters = {
  hasInjected:state => {return state.isInjected},
  getWeb3:state => {return state.web3},
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
  },
  transOptions:state => {
    let opts = {
      gasPrice: state.gasPrice
    }
    if(state.wallet)opts.from = state.wallet
    return opts
  },
  getBasBalance:(state) =>{
    let bal = state.basBal
    if(!bal && bal !== 0) return ''
    return  CurrencyFormat(bal/(10**state.decimals),'0[.]0000')
  }
}

export default getters
