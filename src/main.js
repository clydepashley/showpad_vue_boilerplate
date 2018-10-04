import devtools from '@vue/devtools'
import Vue from 'vue'
import App from './App.vue'

import './utils/fonts.js'
import './utils/directives.js'
import './assets/stylesheets/app.scss'

import VueI18n from 'vue-i18n'
import Vue2TouchEvents from 'vue2-touch-events'
import PdfPlugin from '../../showpad_library/vue/pdf/pdf-plugin'

import store from './store'

import utilsConfig from '../../showpad_library/js/utils/config'
import json from '../public/config.json'

Vue.use(VueI18n)

Vue.use(Vue2TouchEvents, {
  tapTolerance: 10,
  swipeTolerance: 100
})

// PDF plugin uses vuex store
Vue.use(PdfPlugin, {
  store: store
})

Vue.config.productionTip = false

// Vue devtools
if (process.env.NODE_ENV === 'dev') {
  devtools.connect('http://localhost', 8098)
}

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
          locale: window.labels.settings.language.value,
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
