const state = {
  processing: false
}

const mutations = {
  updateProcessing (state, value) {
    state.processing = value
  }
}

const actions = {
  updateProcessing ({ commit }, value) {
    commit('updateProcessing', value)
  }
}

const getters = {
  getProcessing: state => {
    return state.processing
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
