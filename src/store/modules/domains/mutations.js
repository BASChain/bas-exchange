import * as types from './mutations-types'
export default {
  [types.UPDATE_LATEST_ROOT_DOMAINS](state,domains) {
    state.latestRootDomains = domains ||null
  },
  [types.UPDATE_LATEST_SUB_DOMAINS](state,domains) {
    state.latestSubDomains = domains || null
  },
  [types.UPDATE_MARKET_MOST_POPULAR](state,domains) {
    state.marketMostPopluar = domains || null
  },
  [types.UPDATE_MARKET_ON_SALE](state,domains){
    state.marketOnSale = domains||null
  },
  [types.UPDATE_HOME_EXPENSIVE](state,domains) {
    state.homeExpensive = domains||null
  },
  [types.UPDATE_HOME_FAVORATE](state,domains) {
    state.homeFavorate = domains||null
  }
}
