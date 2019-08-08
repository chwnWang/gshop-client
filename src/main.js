import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import store from './store'

import './api'

Vue.component('Header',Header)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
