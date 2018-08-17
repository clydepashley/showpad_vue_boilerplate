<template>
  <div id="app" class="padding-30 margin text-center d-flex align-items-center">
    <div class="w-100">
      <img
        v-img-src="{ id: logo.id, applink: logo.applink}"
        class="logo margin-bottom-15"
      >

      <h1
        v-cl-secondary
      >
        {{ $t("home.title.value") }}
      </h1>

      <ul
        class="padding-15 margin-bottom-15"
        v-cl-secondary
      >
        <li>Showpad SDK version: {{ version }}</li>
        <li>Vue version: {{vueVersion}}</li>
      </ul>

      <a
        href="https://vuejs.org/"
        target="_blank"
        class="button cl-white border-radius"
        v-bg-primary
      >
        Vue.js
      </a>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import './utils/directives.js'

export default {
  name: 'app',
  data () {
    return {
      version: window.ShowpadLib.getVersion(),
      logo: window.assets[window.contents.home.logo.value[0]]
    }
  },
  computed: {
    vueVersion () {
      return Vue.version
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;

  .logo {
    width: auto;
    height: 100px;
  }
}
</style>
