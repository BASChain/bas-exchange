import * as types from './mutation-types'

const fromWei = Web3.utils.fromWei
const toWei = Web3.utils.toWei

export default {
  [types.SET_INJECTED](state, injected) {
    state.injected = injected;
  },
  [types.SET_METAMASK_LOGIN](state,payload){
    state.chainId = payload.chainId||null
    state.wallet = payload.wallet||null
    if (payload.chainId) Cookies.set(types.LAST_CHAINID_KEY, payload.chainId, { expires: 1 })
  },
  [types.CLEAN_WEB3_STATE](state){
    state.chainId = null
    state.wallet = null;
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
  [types.UPDATE_WALLET](state,account){
    state.wallet = account
  },
  [types.UPDATE_CHAINID](state,chainId){
    state.chainId = chainId
    if (chainId) Cookies.set(types.LAST_CHAINID_KEY, chainId, { expires: 1 })
  },
  [types.LOAD_ROOT_ASSETS](state,roots){
    state.rootassets = roots||[]
  },
  [types.LOAD_PUBLIC_MAIL_ASSETS](state,mailassets){
    state.mailassets = mailassets||[]
  },
  [types.LOAD_DOMAIN_YEAR_ITEMS](state,maxYear) {
    if (maxYear && parseInt(maxYear) > 0 && parseInt(maxYear) <= 50 ){
      const items = new Array()
      const unitbas = fromWei(state.subGas || toWei("4",'ether'))
      for (let i = maxYear;i > 0;i--){
        items.push({ y: i, total: parseFloat(unitbas)* i})
      }
      state.domainYearItems = items
    }
  }
};
