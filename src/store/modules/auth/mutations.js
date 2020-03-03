import Vue from 'vue';
import {
  CHECK,
  REGISTER,
  LOGIN,
  LOGOUT,
} from './mutation-types';

export default {
  [CHECK](state) {
    state.authenticated = !!localStorage.getItem('id_token')

    if(state.authenticated){
      Vue.$http.defaults.headers.common.Authorization = `BAS ${localStorage.getItem('id_token')}`
    }
  },

  [REGISTER](state){

  },
  [LOGIN](state,token) {
    state.authenticated = true
    localStorage.setItem('id_token',token)
    Vue.$http.defaults.headers.common.Authorization = `BAS ${token}`;
  },
  [LOGOUT](state) {
    state.authenticated = false;
    localStorage.removeItem('id_token');
    Vue.$http.defaults.headers.common.Authorization = '';
  },
}
