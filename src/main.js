import Vue from 'vue'
import App from './App.vue'

import './utils/fonts.js'
import './utils/directives.js'
import './assets/stylesheets/app.scss'

import VueI18n from 'vue-i18n'
import store from './store'
import PdfPlugin from '../../showpad_library/vue/pdf/pdf-plugin'

import utilsConfig from '../../showpad_library/js/utils/config'
import json from '../public/config.json'

Vue.use(VueI18n)

// PDF plugin uses vuex store
Vue.use(PdfPlugin, {
  store: store
})

Vue.config.productionTip = false

// load showpad sdk
window.onShowpadLibLoaded = () => {
  window.ShowpadLib.getShowpadApi(callbackFn)

  function callbackFn (apiConfig) {
    window.apiConfig = apiConfig

    utilsConfig.loadConfig(apiConfig, {
      env: process.env.NODE_ENV,
      json: json
    })
      .then(response => {
        // set translations based on config
        const i18n = new VueI18n({
          locale: window.labels.settings.locale.value,
          messages: window.labels.translations
        })
        // init vue app
        new Vue({
          render: h => h(App),
          i18n,
          store
        }).$mount('#app')
      })
  }
}
