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
      maxDataLength: state.maxDataLength
    };
  }
};

export default getters;
