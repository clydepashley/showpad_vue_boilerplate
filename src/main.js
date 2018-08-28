import Vue from 'vue'
import App from './App.vue'

import './utils/fonts.js'
import './assets/stylesheets/app.scss'

import VueI18n from 'vue-i18n'
import utils from '../../showpad_library/utils'
import json from '../public/config.json'

Vue.use(VueI18n)
Vue.config.productionTip = false

// load showpad sdk
window.onShowpadLibLoaded = () => {
  // load config based on environment
  utils.loadConfig({
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
        i18n
      }).$mount('#app')
    })
}
