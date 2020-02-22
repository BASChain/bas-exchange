import Vue from 'vue'
import metamask from './Login.vue'
import store from '@/store'

const PopupBox = Vue.extend(metamask)

metamask.install = function(data){
  let instance = new PopupBox({
    store,
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(()=>{
    instance.show()
  })
}

export default metamask;
