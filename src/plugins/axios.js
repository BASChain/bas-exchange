// import Vue from 'vue'
//import axios from 'axios'
import store from  '@/store'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.headers.common.Accept = 'application/json'
axios.interceptors.response.use(
  response => response,
  (error) => {
    if(error.response.status === 401){
     // store.dispatch('auth/logout')
    }
    //console.log(error,message)
    return Promise.reject(error)
  },
)

Vue.$http = axios;

Object.defineProperty(Vue.prototype,'$http',{
  get() {
    return axios;
  },
})
