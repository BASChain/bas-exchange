
//import createLogger from 'vuex/dist/logger'

import getters from './getters'


//Modules
import assets from './modules/assets'
import dapp from './modules/dapp';
import ewallet from './modules/ewallet'

import web3 from './modules/web3';
import auth from './modules/auth';
import domains from './modules/domains'


const debug = process.env.NODE_ENV !== 'production'

const mutations = {
  setLang (state,lg) {
    state.lang = lg;
    Cookies.set('BasLang', lg, { expires: 7 })
  },
  setTopnav(state,name){
    console.log('',name)
    state.topnav = name
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
    assets,
    dapp,
    ewallet,
    web3,
    auth,
    domains,
  },
  state:{
    lang: Cookies.get('BasLang') ||"zh-CN",
    topnav:"home.index",
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
  plugins: [],
})


