/* =====================
 *
 * =====================
 *
 **/
import Vue from 'vue'
import VueRouter from 'vue-router'
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
  if(to.matched.some(m => m.meta.auth)) {
    if(!store.getters.checkMetamaskEnable){
      //console.log('todo login metamask')
      metamask.install({
        to,
        from,
        next
      })
    }else{
      next()
    }
    //next()

  }else if(to.matched.some( m => m.meta.guest) && store.state.auth.authenticated ){
    next({
      name:'home.index'
    })
  }else {
    next()
  }
})

Vue.router = router

export default {
  router,
}
