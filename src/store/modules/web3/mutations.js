import * as types from './mutation-types'

export default {
  [types.CHECK_INJECTED](state,payload) {
    state.isInjected = payload.isInjected;
    if(typeof payload.error !== 'undefined'){
      state.error = payload.error
    }
  },
  /**
   * 刷新chainId,wallet,balance
   * @param {*} state
   * @param {*} payload
   */
  [types.REFRESH_ACC_BASE](state, payload) {
    state.chainId = payload.chainId
    state.wallet = payload.wallet
    state.ethBal = payload.ethBal || state.ethBal
    state.basBal = payload.basBal || state.basBal
    state.drawWei = payload.drawWei || state.drawWei
  },
  /**
   * 用于登录MetaMask
   * @param {*} state
   * @param {*} payload
   */
  [types.LOAD_LOGIN_BASE](state,payload) {
    state.chainId = payload.chainId
    state.wallet = payload.wallet
  },
  /**
   * 加载项目参数
   * @param {*} state
   * @param {*} payload
   */
  [types.LOAD_DAPP_STATE](state,payload) {
    console.log('set dappState>>>>>',payload)
    state.symbol = payload.symbol || state.symbol
    state.decimals = payload.decimals || state.decimals
    state.rareGas = payload.rareGas || state.rareGas
    state.topGas = payload.topGas || state.topGas
    state.subGas = payload.subGas || state.subGas
    state.customedPriceGas = payload.customedPriceGas || state.customedPriceGas
    state.maxYearReg = payload.maxYearReg || state.maxYearReg
    state.maxDaysReg = payload.maxDaysReg || state.maxDaysReg
    state.aliasLen = payload.aliasLen || state.aliasLen
    state.extensionLen = payload.extensionLen || state.aliasLen
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
    state.basBal = payload.basBal === undefined ? null : payload.basBal
  },
  [types.SETNO_ACCOUNT](state,chainId) {
    state.chainId = chainId
    state.wallet = null;
    state.ethBal = 0
    state.basBal = 0
    state.drawWei = 0;
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
  [types.UPDATE_DRAWWEI](state, balance) {
    state.drawWei = balance === undefined ? null : balance
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
