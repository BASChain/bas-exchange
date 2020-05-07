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
})

router.beforeEach((to,from,next) => {
  console.log(to,'>>>>todo login metamask',store.getters.checkMetamaskEnable)
  const needLogin = store.getters.checkMetamaskEnable;
  console.log(
    to.name,
    to.matched.some(m => m.meta.auth),
    needLogin
  );
  if (to.matched.some(m => m.meta.auth) && needLogin) {
    console.log("todo login metamask");
    // metamask.install({
    //   to,
    //   from,
    //   next
    // });
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
