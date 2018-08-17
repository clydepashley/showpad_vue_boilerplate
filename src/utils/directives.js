import Vue from 'vue'

Vue.directive('cl-primary', {
  bind: function (el, binding, vnode) {
    el.style.color = window.labels.settings.colors.primary_color.value
  }
})

Vue.directive('bg-primary', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = window.labels.settings.colors.primary_color.value
  }
})

Vue.directive('cl-secondary', {
  bind: function (el, binding, vnode) {
    el.style.color = window.labels.settings.colors.secondary_color.value
  }
})

Vue.directive('bg-secondary', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = window.labels.settings.colors.secondary_color.value
  }
})

Vue.directive('img-src', {
  bind: function (el, binding, vnode) {
    const assetsUrl = binding.value.applink.replace('showpad://file/', '')
    el.src = window.ShowpadLib.getAssetFileUrl(binding.value.id, assetsUrl)
  }
})
