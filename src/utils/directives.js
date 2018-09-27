import Vue from 'vue'

// Settings directives

Vue.directive('currency', {
  bind: function (el, binding, vnode) {
    el.innerHTML = window.labels.settings.currency.value + el.innerHTML
  }
})

// Design directives

Vue.directive('cl-primary', {
  bind: function (el, binding, vnode) {
    el.style.color = window.labels.design.primary_color.value
  }
})

Vue.directive('bg-primary', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = window.labels.design.primary_color.value
  }
})

Vue.directive('border-primary', {
  bind: function (el, binding, vnode) {
    el.style.borderColor = window.labels.design.primary_color.value
  }
})

Vue.directive('cl-secondary', {
  bind: function (el, binding, vnode) {
    el.style.color = window.labels.design.secondary_color.value
  }
})

Vue.directive('bg-secondary', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = window.labels.design.secondary_color.value
  }
})

Vue.directive('border-secondary', {
  bind: function (el, binding, vnode) {
    el.style.borderColor = window.labels.design.secondary_color.value
  }
})

Vue.directive('cl-tertiary', {
  bind: function (el, binding, vnode) {
    el.style.color = window.labels.design.tertiary_color.value
  }
})

Vue.directive('bg-tertiary', {
  bind: function (el, binding, vnode) {
    el.style.backgroundColor = window.labels.design.tertiary_color.value
  }
})

Vue.directive('border-tertiary', {
  bind: function (el, binding, vnode) {
    el.style.borderColor = window.labels.design.tertiary_color.value
  }
})

// Asset directives

Vue.directive('img-src', {
  bind: function (el, binding, vnode) {
    const assetsUrl = binding.value.appLink.replace('showpad://file/', '')
    el.src = window.ShowpadLib.getAssetFileUrl(binding.value.id, assetsUrl)
  }
})

Vue.directive('bg-src', {
  bind: function (el, binding, vnode) {
    const assetsUrl = binding.value.appLink.replace('showpad://file/', '')
    el.style.backgroundImage = 'url(' + window.ShowpadLib.getAssetFileUrl(binding.value.id, assetsUrl) + ')'
  }
})
