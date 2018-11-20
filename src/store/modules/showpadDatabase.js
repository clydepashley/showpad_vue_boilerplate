import { showpadDatabase } from '@showpad/library'

const state = {
  showpadDB: {
    sdkVersion: null,
    exportedPDF: 0
  }
}

const mutations = {
  initShowpadDB (state, value) {
    state.showpadDB = value
    state.syncShowpadDb = true
  },
  updateSdkVersion (state, value) {
    state.showpadDB.sdkVersion = value
  },
  updateExportedPDF (state) {
    let incrementedValue = parseInt(state.showpadDB.exportedPDF)
    incrementedValue++

    state.showpadDB.exportedPDF = incrementedValue

    // sync to showpadDB
    showpadDatabase.sync(window.apiConfig, {
      id: window.contents.settings.showpadDatabase.id.value[0],
      name: window.labels.settings.showpadDatabase.name.value,
      db: state.showpadDB
    })
  }
}

const actions = {
  updateSdkVersion ({ commit }, value) {
    commit('updateSdkVersionValue', value)
  },
  updateExportedPDF ({ commit }) {
    commit('updateSdkVersionValue')
  }
}

const getters = {
  getShowpadDb: state => {
    return state.showpadDB
  },
  getSdkVersion: state => {
    return state.showpadDB.sdkVersion
  },
  getExportedPDF: state => {
    return state.showpadDB.exportedPDF
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
