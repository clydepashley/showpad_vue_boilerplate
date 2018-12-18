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

          <excel-component />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Excel from './components/Excel'

export default {
  name: 'app',
  data () {
    return {
      background: window.assets[window.contents.design.primary_image.value[0]]
    }
  },
  components: {
    'excel-component': Excel
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
}

</style>
