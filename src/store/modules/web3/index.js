import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

/**
 * call action : this.$store.dispatch('module/method',args)
 * call mutation: this.$store.commit('module/method',args)
 *  this.$store.commit({
 *    type:'method',
 *    value:9,
 *    ...args,
 *  })
 */
export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
