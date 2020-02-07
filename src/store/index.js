import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

//Modules
import account from './modules/account';
import auth from './modules/auth';

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    account,
    auth,
  },

  strict:debug,
  plugins:debug?[createLogger()] : [],
})


