import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import getters from './getters'
import Cookies from 'js-cookie'

//Modules
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
  /**
   * if _metamask.unlock auto login
   * @param {*} param0
   */
  async autoLoginMetaMask({ commit }){
    const web3js = window.web3
    const ethereum = window.ethereum;
    if (web3js && ethereum && ethereum._metamask && ethereum._metamask.isUnlocked()) {
      const chainId = await web3js.eth.getChainId();
      const accounts = await web3.eth.getAccounts();

      if (checkSupport(chainId) && accounts && accounts.length) {
        commit('setMetaMaskLogin', { chainId, wallet: accounts[0] })
        console.log('auto login metamask')
      }
    } else {
      commit('cleanWeb3State')
    }
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
  plugins: debug ? [createLogger()] : [],
})


