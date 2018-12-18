<template>
  <div class="excel">
    <table>
      <thead>
        <tr
          v-for="(row, index) in rows"
          v-bind:key="index"
          v-if="index == 0"
        >
          <td>{{ row[0] }}</td>
          <td>{{ row[1] }}</td>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in rows"
          v-bind:key="index"
          v-if="index !== 0"
        >
          <td>{{ row[0] }}</td>
          <td>{{ row[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import readXlsxFile from 'read-excel-file'

export default {
  name: 'Excel',
  data () {
    return {
      excel: window.assets[window.contents.excelDatabase.id.value[0]],
      rows: []
    }
  },
  mounted () {
    let self = this

    let assetsUrl = self.excel.appLink.replace('showpad://file/', '')
    let url = window.ShowpadLib.getAssetFileUrl(self.excel.id, assetsUrl)

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.apiConfig.accessToken,
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(function (response) {
        return response.blob()
      })
      .then(function (blob) {
        readXlsxFile(blob).then((rows) => {
          self.rows = rows
        })
      })
  }
}
</script>

<style lang="scss">

.excel {
  table {
    width: 100%;
    border: solid 1px #000;

    thead {
      tr {
        background-color: #FFFF00;
      }
    }

    tr {
      td {
        border: solid 1px #000;
      }
    }
  }
}

</style>
