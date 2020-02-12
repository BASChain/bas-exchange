import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

//Modules
// import account from './modules/account';
import auth from './modules/auth';

const debug = process.env.NODE_ENV !== 'production'

const mutations = {
  setLang (state,lg) {
    state.currentLang = lg
  },
  setTopbarTheme (state,payload) {
    state.topbarTheme = payload.topbarTheme
  }
}


export default new Vuex.Store({
  modules: {
    // account,
    auth,
  },
  state:{
    currentLang:"en",
    topbarTheme:"white",
  },
  getters:{
    currentLang: state => {
      return state.currentLang
    },
    getTopbarTheme: state => {
      return state.topbarTheme
    },
  },
  mutations,
  strict:debug,
  plugins:debug?[createLogger()] : [],
})


