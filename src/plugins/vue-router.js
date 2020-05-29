/* =====================
 *
 * =====================
 *
 **/
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'
import metamask from './metamask'

Vue.use(VueRouter)


Vue.prototype.$metamask = metamask.install

export const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(async (to,from,next) => {
  //console.log(to, '>>>>todo login metamask', next)
  const needLogin = store.getters.metaMaskDisabled;
  if (needLogin){//refresh page no wallet
    await store.dispatch('dapp/autoLoginMetaMask');
  }

  if (to.matched.some(m => m.meta.auth) && needLogin) {
    console.log("todo login metamask");
    metamask.install({
      to,
      from,
      next
    });
  } else if (
    to.matched.some(m => m.meta.guest) &&
    store.state.auth.authenticated
  ) {
    next({
      name: "home.index"
    });
  } else {

    next();
  }
})


Vue.router = router

export default {
  router,
}
