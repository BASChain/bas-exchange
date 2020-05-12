/**
 * Main File
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
Vue.config.productionTip = ture
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

/**
 * Bind Infura
 */
//import {BindInfura} from '@/web3-lib/infura'
//BindInfura()

// import $ from 'jquery';
// global.$ = $;
global.Utils = Utils
global.Validator = Validator

import BN from 'bn.js'
global.BN = BN
const LOCAL_CID = process.env.LOCAL_CID || ''
console.log('Local develop:', LOCAL_CID)
//bizjs
import Web3 from 'web3'
import { DAppInfo } from './bascore'
import { CheckRuntime } from '@/bizlib/check-runtime'
const runtime = new CheckRuntime(window.navigator.userAgent)
const browser = runtime.info.name;
global.BasRuntime = Object.assign({},runtime.info,DAppInfo,{browser},{Web3:Web3})

//Binding Infura

//BindInfura(global.BasRuntime)

import './assets/css/main.css'

//Seria WorkFlow
import App from './App'

import store from './store'
//make window.web3 new version and Injected =true
store.dispatch("dapp/checkInjected");

store.dispatch("dapp/autoLoginMetaMask");

//store.dispatch('web3/check')//TODO depared

console.log('Env>>>', process.env.INFURA_SECRET)

import { router } from './plugins/vue-router';

import  ContractHelper from '@/web3-lib/abi-manager'
import InstMgr from './bizlib/web3/instances'
import * as Web3Utils from 'web3-utils'

//init TEST ,production will remove
global.Web3Utils = Web3Utils

global.ContractHelper = ContractHelper
global.InstMgr = InstMgr
import punycode from 'punycode'
global.punycode = punycode


//TODO remove deploy
import TestAPI from './web3-lib/apis/wallet-api'
global.TestAPI = TestAPI;


import {Networks} from "./bizlib/networks";
global.Networks = Networks;

import AllInsts from './web3-lib/apis'
global.AllInsts = AllInsts;

import ApiUtils from './web3-lib/utils'
global.ApiUtils = ApiUtils;

/* eslint-disable no-new */
global.basvue = new Vue({
  el: "#app",
  i18n,
  router,
  store,
  render: h => h(App)
});
