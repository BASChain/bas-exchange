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



import './assets/css/main.css'

import App from './App'
import store from './store'

Vue.config.productionTip = true

store.dispatch('auth/check')

global.$ = $;
/* eslint-disable no-new */
global.basvue = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h =>h(App)
})
