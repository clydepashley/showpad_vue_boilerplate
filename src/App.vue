<template>
  <div id="app">
    <div class="app-container padding-30 text-center d-flex align-items-center">
      <div class="w-100">
        <img
          v-img-src="{ id: logo.id, appLink: logo.appLink}"
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
          <li>Showpad SDK version: {{ getSdkVersion }}</li>
          <li>Vue version: {{ getVueVersion }}</li>
        </ul>

        <button
          class="button cl-white border-radius"
          v-bg-primary
          @click="generatePdf"
        >
          Generate PDF

          <div
            v-if="pdfProcessing"
            class="animation-rotate d-inline-block">
              <i class="fas fa-spinner"></i>
          </div>
        </button>
      </div>
    </div>

    <pdf-editor />
  </div>
</template>

<script>

import Vue from 'vue'
import { mapGetters } from 'vuex'

import apiAssets from '../../showpad_library/js/api/assets'
import pdf from '../../showpad_library/js/pdf/pdf'

export default {
  name: 'app',
  data () {
    return {
      logo: window.assets[window.contents.home.logo.value[0]],
      console: '',
      pdfProcessing: false
    }
  },
  computed: {
    ...mapGetters([
      'getSdkVersion',
      'getVueVersion',
      'getTemplateId',
      'getFields'
    ]),
    vueVersion () {
      return Vue.version
    }
  },
  mounted () {
    this.$store.commit('updateSdkVersion', window.ShowpadLib.getVersion())
    this.$store.commit('updateVueVersion', this.vueVersion)
  },
  methods: {
    generatePdf () {
      let self = this
      self.pdfProcessing = true

      pdf.JsonToPdf(window.apiConfig, {
        title: self.$t('home.title.value'),
        author: 'Showpad PDF plugin',
        templateId: this.getTemplateId,
        fields: self.getFields
      })
        .then(function (response) {
          apiAssets.postPdfToPersonalDivision(window.apiConfig, {
            name: self.$t('home.title.value'),
            description: 'Showpad PDF plugin',
            file: response
          })
            .then(function (response) {
              let assets = []
              let assetUrl = response.appLink.replace('showpad://file/', '')
              assets.push(assetUrl)

              window.ShowpadLib.addAssetsToCollection(assets, function (collectionId) {
                if (collectionId) {
                  self.pdfProcessing = false
                }
              })
            })
        })
    }
  }
}
</script>

<style lang="scss">
.app-container {
  height: 100vh;

  .logo {
    width: auto;
    height: 100px;
  }

  .animation-rotate {
    margin-left: 5px;
  }
}
</style>
