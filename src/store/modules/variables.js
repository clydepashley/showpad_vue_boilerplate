const state = {
  variables: {
    sdkVersion: null,
    vueVersion: null
  }
}

const mutations = {
  updateSdkVersion (state, value) {
    state.variables.sdkVersion = value
  },
  updateVueVersion (state, value) {
    state.variables.vueVersion = value
  }
}

const actions = {
  updateSdkVersion ({ commit }, value) {
    commit('updateSdkVersionValue', value)
  },
  updateVueVersion ({ commit }, value) {
    commit('updateSdkVersionValue', value)
  }
}

const getters = {
  getVariableByKey: state => (key) => {
    return state.variables[key]
  },
  getSdkVersion: state => {
    return state.variables.sdkVersion
  },
  getVueVersion: state => {
    return state.variables.vueVersion
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
