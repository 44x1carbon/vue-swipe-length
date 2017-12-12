import Vue from 'vue'
import App from './App.vue'
import VueSwipeLength from './plagin'

Vue.use(VueSwipeLength)

new Vue({
  el: '#app',
  render: h => h(App)
})
