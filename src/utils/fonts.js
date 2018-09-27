
import Vue from 'vue'
import WebFont from 'webfontloader'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// Webfont loader

WebFont.load({
  google: {
    families: ['Muli: 300, 400, 600, 700']
  }
})

// Fontawesome

library.add(
  faSpinner
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
