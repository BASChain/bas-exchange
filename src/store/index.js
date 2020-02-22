import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import getters from './getters'

//Modules
import web3 from './modules/web3';
import auth from './modules/auth';

const debug = process.env.NODE_ENV !== 'production'

const mutations = {
  setLang (state,lg) {
    state.currentLang = lg
  },
  setBrowser(state,payload) {
    state.browser = payload
  }
}


export default new Vuex.Store({
  modules: {
    web3,
    auth,
  },
  state:{
    currentLang:"en",
    browser:null,
  },
  getters,
  mutations,
  strict:debug,
  plugins:debug?[createLogger()] : [],
})


