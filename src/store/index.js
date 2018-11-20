import Vue from 'vue'
import Vuex from 'vuex'

import showpadDatabase from './modules/showpadDatabase'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    showpadDatabase
  }
})
