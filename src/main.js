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

import $ from 'jquery';
global.$ = $;

//bizjs
import { DAppInfo } from './bascore'
import { CheckRuntime } from '@/bizlib/check-runtime'
const runtime = new CheckRuntime(window.navigator.userAgent)
const browser = runtime.info.name;
global.BasRuntime = Object.assign({},runtime.info,DAppInfo,{browser})
import  ContractHelper from '@/bizlib/abi-manager'
global.ContractHelper = ContractHelper

import './assets/css/main.css'

//Seria WorkFlow
import App from './App'

import store from './store'
store.dispatch('web3/check')
import { router } from './plugins/vue-router';

import  {checkMetaMask,getBasTokenInstance,getStoreWeb3}  from './bizlib/web3'

checkMetaMask.then(result =>{
  global.basweb3 = result.web3();
  global.BasToken = getBasTokenInstance
  console.log('st>>>',getStoreWeb3())
}).catch(e=>{
  console.log("load web3 err:",e)
})


/* eslint-disable no-new */
global.basvue = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h =>h(App)
})
