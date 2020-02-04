import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'
import Market from '@/components/Market'
import Registered from '@/components/Registered'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome
    },
    {
      path: '/apply',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/market',
      name: 'Market',
      component: Market
    }
  ]
})
