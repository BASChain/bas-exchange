import { getNetwork, checkSupport } from "@/bizlib/networks"
import { CurrencyFormat } from '@/utils'


const getters = {
  hasInjected: state => { return state.isInjected },
  dappState: state => {
    return {
      chainId: state.chainId,
      wallet: state.wallet,
      gasPrice: state.gasPrice,
      decimals: state.decimals,
      ethBal: state.ethBal,
      basBal: state.basBal,
      rareGas: state.rareGas,
      topGas: state.topGas,
      subGas: state.subGas,
      customedPriceGas: state.customedPriceGas,
      maxYearReg: state.maxYearReg,
      maxDaysReg: state.maxDaysReg,
      aliasLen: state.aliasLen,
      extensionLen: state.extensionLen
    }
  },
  getNetwork: state => {
    return getNetwork(state.chainId || '')
  },
  getNetworkName: state => {
    const nw = getNetwork(state.chainId)
    return nw ? nw.name : ''
  },
  getEthBalance: state => {
    if (state.ethBal == null) return '0'
    const ethBal = state.ethBal / (10 ** state.decimals)
    return CurrencyFormat(ethBal, '0[.]0000')
  },
  getBasBalance: (state) => {
    let bal = state.basBal
    if (!bal && bal !== 0) return '0'
    return CurrencyFormat(bal / (10 ** state.decimals), '0[.]0000')
  },
  metamaskConnected: state => {
    return state.isInjected == true && state.chainId != null && state.wallet != null;
  },
  checkNetworkSupported: state => {
    if (state.chainId == null) return false;
    return checkSupport(state.chainId)
  },
  transOptions: state => {
    let opts = {
      gasPrice: state.gasPrice
    }
    if (state.wallet) opts.from = state.wallet
    return opts
  },

  getOANNConfigs: (state) => {
    let decimals = state.decimals || 18;
    let configs = {
      decimals,
      maxYearReg: parseInt(state.maxYearReg),
      rareGas: state.rareGas / (10 ** decimals),
      topGas: state.topGas / (10 ** decimals),
      subGas: state.subGas / (10 ** decimals),
      customedPriceGas: state.customedPriceGas / (10 ** decimals)
    }
    return configs;
  },

  loginState:(state)=>{
    return {
      isInjected: state.isInjected,
      chainId: state.chainId,
      wallet: state.wallet
    }
  },
  ethWei:(state)=>{
    return state.ethBal
  },
  basWei:(state) =>{
    return state.basBal
  },
  ruleState: (state) => {
    //show and ctrl eth
    //
    let decimals = state.decimals || 18;
    let ret = {
      symbol:state.symbol,
      decimals,
      rareGas: state.rareGas / (10 ** decimals),
      topGas: state.topGas / (10 ** decimals),
      subGas: state.subGas / (10 ** decimals),
      externalBAS: state.externalBAS / (10 ** decimals)||100,
      maxYearReg: state.maxYearReg || 5,
      maxDaysReg: state.maxDaysReg,
      aliasLen: state.aliasLen,
      extensionLen: state.extensionLen
    }

    return ret
  }
}

export default getters
