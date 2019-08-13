import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Button} from 'mint-ui'
import Header from './components/Header/Header.vue'
import CartControl from './components/CartControl/CartControl.vue'
import store from './store'

import './mock/mock-server'
import './validate'

Vue.component('Header',Header);
Vue.component('CartControl', CartControl)
Vue.component(Button.name, Button) 

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
