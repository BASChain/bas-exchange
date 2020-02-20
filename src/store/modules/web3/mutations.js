import * as types from './mutation-types'

export default {
  [types.CHECK_INJECTED](state,payload) {
    state.isInjected = payload.isInjected;
    if(typeof payload.web3 !== 'undefined'){
      state.web3 = payload.web3
    }
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
  }
}
