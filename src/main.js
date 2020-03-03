/**
 * Main File
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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
import './plugins/register-service-worker'
import * as Utils from './utils'
// import $ from 'jquery';
// global.$ = $;
global.Utils = Utils

//bizjs
import { DAppInfo } from './bascore'
import { CheckRuntime } from '@/bizlib/check-runtime'
const runtime = new CheckRuntime(window.navigator.userAgent)
const browser = runtime.info.name;
global.BasRuntime = Object.assign({},runtime.info,DAppInfo,{browser})

//Binding Infura
import { BindInfura } from './bizlib/infura'
//BindInfura(global.BasRuntime)

import './assets/css/main.css'

//Seria WorkFlow
import App from './App'

import store from './store'

store.dispatch('web3/check')



import { router } from './plugins/vue-router';

import  ContractHelper from '@/bizlib/abi-manager'
import  {checkMetaMask,getBasTokenInstance}  from './bizlib/web3'
import { getBasAssetInstance, getBasOANNInstance} from './bizlib/web3/domain-api'
import * as Web3Utils from 'web3-utils'

//init TEST ,production will remove
global.Web3Utils = Web3Utils

global.ContractHelper = ContractHelper
global.BasToken = getBasTokenInstance
global.getBasAssetInstance = getBasAssetInstance
global.getBasOANNInstance = getBasOANNInstance


/* eslint-disable no-new */
global.basvue = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h =>h(App)
})
