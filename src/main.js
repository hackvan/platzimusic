import Vue from 'vue'
import VueFilterPluralize from 'vue-filter-pluralize'
import App from './App.vue'

Vue.use(VueFilterPluralize)

new Vue({
  el: '#app',
  render: h => h(App)
})