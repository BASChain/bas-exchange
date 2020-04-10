import * as types from './mutations-types'
export default {
  [types.UPDATE_LATEST_ROOT_DOMAINS](state,domains) {
    state.latestRootDomains = Object.assign(domains ||null)
  },
  [types.UPDATE_LATEST_ROOT_DOMAINS_CHANGED](state,flag){
    state.latestRootDomainsChanged = Boolean(flag)
  },
  [types.UPDATE_LATEST_SUB_DOMAINS](state,domains) {
    state.latestSubDomains = Object.assign(domains || null)
  },
  [types.UPDATE_LATEST_SUB_DOMAINS_CHANGED](state,flag) {
    state.latestSubDomainsChanged = Boolean(flag)
  },
  [types.UPDATE_MARKET_MOST_POPULAR](state,domains) {
    state.marketMostPopluar = Object.assign(domains || null)
  },
  [types.UPDATE_MARKET_ON_SALE](state,domains){
    state.marketOnSale = Object.assign(domains||null)
  },
  [types.UPDATE_HOME_EXPENSIVE](state,domains) {
    state.homeExpensive = Object.assign(domains||null)
  },
  [types.UPDATE_HOME_FAVORATE](state,domains) {
    state.homeFavorate = Object.assign(domains||null)
  }
}
