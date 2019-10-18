// import devtools from '@vue/devtools'

import Vue from 'vue'
import App from './App.vue'

import './utils/fonts.js'
import './utils/directives.js'
// import './assets/stylesheets/app.scss'

// import VueI18n from 'vue-i18n'
// import Vue2TouchEvents from 'vue2-touch-events'

// import store from './store'
// import json from '../public/config.json'

// import { showpadConfig } from '@showpad/library'

// init vue plugins
// Vue.use(VueI18n)
// Vue.use(Vue2TouchEvents, { tapTolerance: 10, swipeTolerance: 100 })

console.log('Main.js reporting!')

// developer tools based on environment
if (process.env.NODE_ENV === 'dev') {
  Vue.config.productionTip = false
  // devtools.connect('http://localhost', '8098')
}

// wait for injection of showpadLib
/*
window.onShowpadLibLoaded = loadShowpadApi

// load apiConfig and set on window
function loadShowpadApi () {
  window.ShowpadLib.getShowpadApi((apiConfig) => {
    window.apiConfig = apiConfig

    loadShowpadConfig()
  })
}

// load labels, content, assets and set on window
function loadShowpadConfig () {
  showpadConfig.init(window.apiConfig, {
    env: process.env.NODE_ENV,
    json: json
  })
    .then(function (response) {
      loadShowpadApp()
    })
}
*/

// load experience app with translations
function loadShowpadApp () {
  /*
      let i18n = new VueI18n({
      locale: window.labels.settings.language.value,
      messages: window.labels.translations
    })
    */

  new Vue({
    render: h => h(App)
    /*
                        render: h => h(App),
                        i18n,
                        store
                        */
  }).$mount('#app')
}

// New onShowpadLibLoaded Code
window.onShowpadLibLoaded = () => {
  console.log('Checkpoint 1')
  window.ShowpadLib.getShowpadApi((apiConfig) => {
    console.log('Checkpoint 2')
    let url = window.location.href.split('configUrl=')[1].split('&')[0]
    url = decodeURIComponent(url)

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiConfig.accessToken,
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(function (response) {
        console.log('Checkpoint 3')
        return response.json()
      })
      .then(function (data) {
        console.log('Checkpoint 4')
        window.labels = data.labels
        window.contents = data.contents
        window.assets = data.assets

        // init()
        loadShowpadApp()
      })
  })
}
