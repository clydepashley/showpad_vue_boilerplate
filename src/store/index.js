import Vue from 'vue'
import Vuex from 'vuex'

import variables from './modules/variables'
import processing from './modules/processing'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    variables,
    processing
  }
})
