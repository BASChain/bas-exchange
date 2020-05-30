import Vue from 'vue'

import * as Types from './mutation-types'

export default {
  [Types.SET_LATEST_ROOT_DOMAINS](state,data){
    if(data)state.latestRoots = data
  },
  [Types.SET_LATEST_SUB_DOMAINS](state,data) {
    Vue.set(state,"lastestSubs",data)
  }
}
