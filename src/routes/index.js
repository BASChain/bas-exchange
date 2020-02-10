export default [
  //Home
  {
    path:'/home',
    name:'home.index',
    component: () => import('@/views/Home/Index.vue'),

    meta:{
      guest:true
    }
  },
  {
    path:'/apply',
    name:'apply.index',
    component: () => import('@/views/Apply/Index.vue'),

    meta:{
      guest:true
    }
  },
  {
    path:'/market',
    name:'market.index',
    component: ()=> import('@/views/Market/Index.vue'),
    meta: {
      guest:true
    }
  },

  {
    path:'/agent',
    name:'agent.index',
    component: ()=> import('@/views/SuperAgent/Index.vue'),
    meta: {
      guest:true
    }
  },
  {
    path:'/account',
    name:'account.index',
    component: () => import('@/views/Account/Index.vue'),
    meta:{
      // auth:true,
      guest:true,
    }
  },
  {
    path:'/login',
    name:'login.index',
    component:() => import('@/views/Login/Index.vue'),
    meta:{
      guest:true
    }
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/*',
    redirect:'/home'
  }
]
