import Vue from 'vue'
import Axios from 'axios'
import store from  '@/store'

Axios.defaults.baseURL = process.env.VUE_APP_BASE_API
Axios.defaults.headers.common.Accept = 'application/json'
Axios.interceptors.response.use(
  response => response,
  (error) => {
    if(error.response.status === 401){
     // store.dispatch('auth/logout')
    }
    console.log(error,message)
    return Promise.reject(error)
  },
)

Vue.$http = Axios;

Object.defineProperty(Vue.prototype,'$http',{
  get() {
    return Axios;
  },
})
