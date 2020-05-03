/**
 *
 */
const getters = {
  typeDicts: state => {
    return state.typeDiction;
  },
  ruleState: state => {
    const decimals = state.decimals;

    return {
      decimals,
      rareBas: state.rareGas / 10 ** decimals,
      rootBas: state.rootGas / 10 ** decimals,
      subBas: state.subGas / 10 ** decimals,
      externalBas: state.externalGas / 10 ** decimals,
      maxRegYears: state.maxRegYears,
      maxDataLength: state.maxDataLength,
      maxPriceBas: state.maxPriceBas,
      minSubBas:state.subGas / (10 ** decimals)
    };
  },
  /**
   * login status
   */
  loginState:state => {
    console.log(state.chainId)
    return state.injected && Boolean(state.chainId) && Boolean(state.wallet)
  },
  web3State:state => {
    return {
      injected: state.injected,
      chainId:state.chainId,
      wallet:state.wallet
    };
  }
};

export default getters;
