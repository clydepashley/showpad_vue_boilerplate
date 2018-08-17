import Vue from 'vue'
import App from './App.vue'

import VueI18n from 'vue-i18n'
import axios from 'axios'

import './utils/fonts.js'
import './assets/stylesheets/app.scss'

// import local config for development
import localdata from '../public/config.json'

Vue.use(VueI18n)
Vue.config.productionTip = false

// TODO: Delete when double load bug is gone
let sdkLoaded = false

// load showpad sdk
window.onShowpadLibLoaded = () => {
  // TODO: Delete when double load bug is gone
  if (sdkLoaded === false) {
    sdkLoaded = true

    let queryParams = readQueryParams(window.location.search)
    let configUrl = decodeURIComponent(queryParams['configUrl'])

    // load config.json
    axios.get(configUrl)
      .then(response => {
        // set config global
        window.labels = response.data.labels
        window.contents = response.data.contents
        window.assets = response.data.assets

        // load local config for development
        if (process.env.NODE_ENV === 'dev') {
          window.labels = localdata.labels
          window.contents = localdata.contents
          // TODO: add local assets (ask to dev team)
        }

        // set translations based on config
        const i18n = new VueI18n({
          locale: window.labels.settings.locale.value,
          messages: window.labels.translations
        })

        // init vue app
        new Vue({
          render: h => h(App),
          i18n
        }).$mount('#app')
      })
  }
}

function readQueryParams (params) {
  return params.substr(1).split('&').reduce(function (acc, pair) {
    if (!pair) {
      return acc
    }
    var parts = pair.split('=')
    acc[parts[0]] = parts[1]
    return acc
  }, {})
}
