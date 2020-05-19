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

import BN from 'bn.js'
global.BN = BN

//bizjs
import Web3 from 'web3'
import { DAppInfo } from './bascore'
import { CheckRuntime } from '@/bizlib/check-runtime'
const runtime = new CheckRuntime(window.navigator.userAgent)
const browser = runtime.info.name;
global.BasRuntime = Object.assign({}, runtime.info, DAppInfo, { browser }, { Web3: Web3 })

//Binding Infura
import { BindInfura } from './web3-lib/infura'
BindInfura()

import './assets/css/main.css'

//Seria WorkFlow
import App from './App'

import store from './store'
import { router } from './plugins/vue-router';

//make window.web3 new version and Injected =true
store.dispatch("dapp/checkInjected");

store.dispatch('dapp/autoLoginMetaMask');

store.dispatch('dapp/loadDAppConfiguration');

//store.dispatch('web3/check')//TODO depared





import ContractHelper from '@/web3-lib/abi-manager'

import * as Web3Utils from 'web3-utils'

//init TEST ,production will remove
global.Web3Utils = Web3Utils

global.ContractHelper = ContractHelper
import punycode from 'punycode'
global.punycode = punycode

import ABITestHelper from './web3-lib/abi-manager/bas-view'

global.ABITestHelper = ABITestHelper;

import TestAPI from './web3-lib/apis/view-api'
global.TestAPI = TestAPI;

import DomainApis from './web3-lib/apis/domain-api'
global.DomainApis = DomainApis




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
