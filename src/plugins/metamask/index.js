//import Vue from 'vue'
import metamask from './Login.vue'
import store from '@/store'
import { i18n } from '../vue-i18n';

const PopupBox = Vue.extend(metamask)

/**
 * data: {
 *
 * }
 */
metamask.install = function(data){
  let instance = new PopupBox({
    store,
    i18n,
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(()=>{
    instance.show()
  })
}

export default metamask;
