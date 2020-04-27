import * as types from './mutation-types'

export default {
  [types.LOAD_DAPP_CONFIG](state,payload) {
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
  [types.LOAD_TYPE_DICTION](state,dicts) {
    if(dicts && dicts instanceof Array) state.typeDiction = dicts;
  }
}
