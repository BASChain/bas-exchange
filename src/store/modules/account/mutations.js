import { FIND } from './mutation-types'

export default {
  [FIND] ( state , account ) {
    state.wallet = account.wallet
    state.nickname = account.nickname
  },

}
