/**
 * Main File
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

/* =====================
 * Plugins Import
 * =====================
 *
 **/
import './plugins/vuex'
import './plugins/axios'

import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';

import './plugins/vuex-router-sync'
import './plugins/bootstrap'
import './plugins/elementui'
import './plugins/font-awesome'
import './plugins/register-service-worker'
import $ from 'jquery';

//bizjs
import { DAppInfo } from './bascore'
global.DAppInfo =DAppInfo
import  ContractHelper from './bizlib/abi-manager'
global.ContractHelper = ContractHelper

import  {checkMetaMask}  from './bizlib/web3'

checkMetaMask.then(result =>{
  //console.log('>>>>>>',result)
  global.basweb3 = result.web3();
}).catch(e=>{
  console.log("load web3 err:",e)
})

import './assets/css/main.css'

import metamask from './plugins/metamask'
Vue.prototype.$metamask = metamask.install

import App from './App'
import store from './store'

Vue.config.productionTip = true

store.dispatch('web3/check')

global.$ = $;
/* eslint-disable no-new */
global.basvue = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h =>h(App)
})
