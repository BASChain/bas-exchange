import * as types from './mutation-types'

export default {
  [types.CHECK_INJECTED](state,payload) {
    state.isInjected = payload.isInjected;
    if(typeof payload.error !== 'undefined'){
      state.error = payload.error
    }
  },
  /**
   *
   * @param {*} state
   * @param {chainI,wallet } payload
   */
  [types.ENABLE_METAMASK](state,payload) {
    state.chainId = payload.chainId || null;
    state.wallet = payload.wallet||null;
    state.ethBal = payload.ethBal === undefined ? null : payload.ethBal;
    state.gasPrice = payload.gasPrice || state.gasPrice;
  },
  //update wallet
  [types.UPDATE_WALLET](state,wallet){
    state.wallet = wallet ||null;
  },
  [types.UPDATE_CHAINID](state,chainId) {
    state.chainId = chainId ||null;
  },
  [types.UPDATE_ETHBAL](state,balance){
    state.ethBal = balance === undefined ? null : balance
  },
  [types.UPDATE_BASBAL](state,balance) {
    state.basBal = balance === undefined ? null : balance
  },
  [types.UPDATE_TOKEN](state,payload){
    state.basBal = payload.basBal || state.basBal;
    state.symbol = payload.symbol ||state.symbol
    state.decimals = payload.decimals || state.decimals
  },
  [types.SET_ERROR](state,ex){
    state.error = ex ? ex : null;
  },
  /**
   * set OANN data
   * @param {*} state
   * @param {*} payload
   */
  [types.UPDATE_OANNDATA] (state,payload) {
    if(payload.rareGas)state.rareGas = payload.rareGas
    if(payload.topGas)state.topGas = payload.topGas
    if(payload.subGas)state.subGas = payload.subGas
    if(payload.customedPriceGas)state.customedPriceGas = payload.customedPriceGas
    if(payload.maxYearReg)state.maxYearReg = payload.maxYearReg
  }
}
