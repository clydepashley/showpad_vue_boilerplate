<template>
  <div id="app">
    <div
      class="app-container font-smoothing padding-30 text-center d-flex align-items-center"
      v-bg-src="{ id: background.id, appLink: background.appLink}"
    >
      <div class="w-100">
        <div class="d-inline-block bg-white padding-30 border-radius box-shadow">
          <h1
            class="margin-bottom-15"
            v-cl-tertiary
          >
            {{ $t("home.title.value") }}
          </h1>

          <ul
            class="margin-bottom-30"
            v-cl-tertiary
          >
            <li>{{ $t("home.sdkVersion.value") }} {{ getSdkVersion }}</li>
          </ul>

          <button
            class="button cl-white border-radius"
            v-bg-gradient="{ orientation: 135}"
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
import { apiAssets, pdfPdf } from '@showpad/library'

export default {
  name: 'app',
  data () {
    return {
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
    console.log('test')
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

      pdfPdf.JsonToPdf(window.apiConfig, {
        title: 'Showpad Vue boilerplate',
        author: 'Showpad PDF plugin',
        templateId: templateId,
        fields: fields,
        questions: self.questions
      })
        .then(function (response) {
          apiAssets.postAssetToPersonalDivision(window.apiConfig, {
            name: 'Showpad Vue boilerplate',
            description: 'Showpad PDF plugin',
            filetype: 'pdf',
            extention: '.pdf',
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
