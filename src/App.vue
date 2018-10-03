<template>
  <div id="app">
    <div id="console" style="position:absolute;z-index:9999lleft:0;bottom:0;width:100vw;height:200px;padding:15px;background-color:#ffffff;border-top:solid 1px #000000;"></div>

    <div
      class="app-container padding-30 text-center d-flex align-items-center"
      v-bg-src="{ id: background.id, appLink: background.appLink}"
    >
      <div class="w-100">
        <div class="d-inline-block bg-white padding-30 border-radius box-shadow">
          <img
            class="logo margin-bottom-15"
            v-img-src="{ id: logo.id, appLink: logo.appLink}"
          >

          <h1
            class="font-smoothing"
            v-cl-secondary
          >
            {{ $t("home.title.value") }}
          </h1>

          <ul
            class="padding-15 margin-bottom-15"
            v-cl-secondary
          >
            <li>{{ $t("home.sdkVersion.value") }} {{ getSdkVersion }}</li>
          </ul>

          <button
            class="button cl-white border-radius"
            v-bg-primary
            v-touch:tap="generatePdf"
          >
            <div
              v-if="getProcessing === true"
              class="animation-rotate d-inline-block">
                <font-awesome-icon icon="spinner" />
            </div>

            {{ $t("home.generatePdf.value") }}
          </button>
        </div>
      </div>
    </div>

    <pdf-editor />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

import apiAssets from '../../showpad_library/js/api/assets'
import pdf from '../../showpad_library/js/pdf/pdf'

export default {
  name: 'app',
  data () {
    return {
      logo: window.assets[window.contents.design.logo.value[0]],
      background: window.assets[window.contents.design.background.value[0]]
    }
  },
  computed: {
    ...mapGetters([
      'getSdkVersion',
      'getProcessing'
    ])
  },
  mounted () {
    this.$store.commit('updateSdkVersion', window.ShowpadLib.getVersion())
  },
  methods: {
    generatePdf () {
      let self = this
      let templateId = window.contents.pdfPlugin.templates['template1'].pdf.value[0]
      let fields = JSON.parse(window.labels.pdfPlugin.templates['template1'].fields.value.replace(/'/g, '"'))

      this.$store.commit('updateTemplateId', templateId)
      this.$store.commit('setFields', fields)
      this.$store.commit('updateProcessing', true)

      pdf.JsonToPdf(window.apiConfig, {
        title: 'Showpad Vue boilerplate',
        author: 'Showpad PDF plugin',
        templateId: templateId,
        fields: fields,
        questions: self.questions
      })
        .then(function (response) {
          apiAssets.postPdfToPersonalDivision(window.apiConfig, {
            name: 'Showpad Vue boilerplate',
            description: 'Showpad PDF plugin',
            file: response
          })
            .then(function (response) {
              self.$store.commit('updateProcessing', false)

              let assets = []
              let assetUrl = response.appLink.replace('showpad://file/', '')
              assets.push(assetUrl)

              window.ShowpadLib.addAssetsToCollection(assets, () => {
                console.log('succesfully added to collection')
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
  background-size: cover;
  background-position: center;

  .logo {
    width: auto;
    height: 100px;
  }

  .animation-rotate {
    margin-right: 5px;
  }
}
</style>
