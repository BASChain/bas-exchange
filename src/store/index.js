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
    if(typeof payload === 'Object'){
      state.browser.name = payload.name
      state.browser.os = payload.os
      state.browser.version = payload.version
      state.browser.detectOS = payload.detectOS
    }
  }
}


export default new Vuex.Store({
  modules: {
    web3,
    auth,
  },
  state:{
    currentLang:"en",
    browser:{
      name:'',
      version:'',
      os:'',
      detectOS:''
    },
  },
  getters,
  mutations,
  strict:debug,
  plugins:debug?[createLogger()] : [],
})


