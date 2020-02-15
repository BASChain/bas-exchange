import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
const offset =260,center = false;
Vue.prototype.$basTip = {
  warn(text){
    return {
      message:text||'',
      duration:5000,
      offset,
      center,
      type: 'warn'
    }
  },
  error(text){
    return {
      message:text||'',
      duration:5000,
      offset,
      center,
      type: 'error'
    }
  }
}
