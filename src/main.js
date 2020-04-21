/**
 * Main File
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
Vue.config.productionTip = true
/* =====================
 * Plugins Import
 * =====================
 *
 **/
import './plugins/vuex'
import './plugins/axios'

import { i18n } from './plugins/vue-i18n';


import './plugins/vuex-router-sync'
import './plugins/bootstrap'
import './plugins/elementui'
import './plugins/font-awesome'
// import './plugins/register-service-worker'
import * as Utils from './utils'
import Validator from './utils/Validator.js'
// import $ from 'jquery';
// global.$ = $;
global.Utils = Utils
global.Validator = Validator

//bizjs
import Web3 from 'web3'
import { DAppInfo } from './bascore'
import { CheckRuntime } from '@/bizlib/check-runtime'
const runtime = new CheckRuntime(window.navigator.userAgent)
const browser = runtime.info.name;
global.BasRuntime = Object.assign({},runtime.info,DAppInfo,{browser},{Web3:Web3})

//Binding Infura
import { BindInfura } from './bizlib/infura'
//BindInfura(global.BasRuntime)

import './assets/css/main.css'

//Seria WorkFlow
import App from './App'

import store from './store'
//make window.web3 new version and Injected =true
store.dispatch('web3/check')



import { router } from './plugins/vue-router';

import  ContractHelper from '@/bizlib/abi-manager'
import  {getBasTokenInstance}  from './bizlib/web3'
import InstMgr from './bizlib/web3/instances'
import * as Web3Utils from 'web3-utils'

//init TEST ,production will remove
global.Web3Utils = Web3Utils

global.ContractHelper = ContractHelper
global.InstMgr = InstMgr
import punycode from 'punycode'
global.punycode = punycode


/* eslint-disable no-new */
global.basvue = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h =>h(App)
})
