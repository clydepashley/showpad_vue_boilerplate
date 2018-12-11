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
            {{ $t("title.value") }}
          </h1>

          <ul
            class="margin-bottom-30"
            v-cl-tertiary
          >
            <li>{{ $t("sdkVersion.value") }} {{ getSdkVersion }}</li>
            <li>{{ $t("exportedPDF.value") }} {{ getExportedPDF }}</li>
            <li>{{ $t("leadCount.value") }} {{ leadCount }}</li>
          </ul>

          <button
            class="button cl-white border-radius"
            v-bg-gradient="{ orientation: 135}"
            v-touch:tap="generatePdf"
          >
            {{ $t("generatePdf.value") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { showpadPdf } from '@showpad/library'

export default {
  name: 'app',
  data () {
    return {
      leadCount: 0,
      background: window.assets[window.contents.design.primary_image.value[0]]
    }
  },
  computed: {
    ...mapGetters([
      'getShowpadDb',
      'getSdkVersion',
      'getExportedPDF'
    ])
  },
  mounted () {
    let self = this
    self.$store.commit('updateSdkVersion', window.ShowpadLib.getVersion())

    // Actual salesforce API request
    fetch(window.labels.settings.showpadSalesforce.cors_anywhere.value + 'https://eu16.salesforce.com/services/data/v43.0/query?q=SELECT+count()+FROM+Lead', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.salesforceApi.accessToken
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        self.leadCount = data.totalSize
      })
  },
  methods: {
    generatePdf () {
      let self = this

      showpadPdf.generatePdf(window.apiConfig, {
        title: 'Vue boilerplate',
        author: window.ShowpadLib.getUserInfo().full_name,
        template: 'primary_template',
        database: self.getShowpadDb
      })
        .then(function (response) {
          let assets = []
          let assetUrl = response.appLink.replace('showpad://file/', '')
          assets.push(assetUrl)

          window.ShowpadLib.addAssetsToCollection(assets)
          window.ShowpadLib.displayToast({
            type: 'success',
            text: 'Pdf generated and uploaded to "my files"'
          })

          self.$store.commit('updateExportedPDF')
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
