import * as types from './mutation-types'

export default {
  [types.SET_INJECTED](state, injected) {
    state.injected = injected;
  },
  [types.SET_METAMASK_LOGIN](state,payload){
    state.chainId = payload.chainId||null
    state.wallet = payload.wallet||null
  },
  [types.LOAD_DAPP_CONFIG](state, payload) {
    state.symbol = payload.symbol || state.symbol;
    state.decimals = payload.decimals || state.decimals;
    state.rareGas = payload.rareGas || state.rareGas;
    state.rootGas = payload.rootGas || state.rootGas;
    state.subGas = payload.subGas || state.subGas;
    state.externalGas = payload.externalGas || state.externalGas;
    state.maxRegYears = payload.maxRegYears || state.maxRegYears;
    state.maxRegDays = payload.maxRegDays || state.maxRegDays;
    state.maxDataLength = payload.maxDataLength || state.maxDataLength;
  },
  [types.LOAD_TYPE_DICTION](state, dicts) {
    if (dicts && dicts instanceof Array) state.typeDiction = dicts;
  },
  [types.SET_BALANCES](state,payload) {
    console.log("set balances", payload);
    state.ethwei = payload.ethwei||null
    state.baswei = payload.baswei||null
  },
  [types.UPDATE_ETHWEI](state,weiBN){
    if(weiBN)state.ethwei = weiBN
  },
  [types.UPDATE_BASWEI](state,weiBN){
    if (weiBN) state.baswei = weiBN;
  },
  [types.UPDATE_CHAINID](state,chainId){
    state.chainId = chainId
  }
};
