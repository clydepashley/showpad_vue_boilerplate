const state = {
  variables: {
    sdkVersion: null
  }
}

const mutations = {
  updateSdkVersion (state, value) {
    state.variables.sdkVersion = value
  }
}

const actions = {
  updateSdkVersion ({ commit }, value) {
    commit('updateSdkVersionValue', value)
  }
}

const getters = {
  getVariableByKey: state => (key) => {
    return state.variables[key]
  },
  getSdkVersion: state => {
    return state.variables.sdkVersion
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
