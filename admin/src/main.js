import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import './plugins/element.js'

import './styles.scss'
import './styles/reset.scss'

import MTopHandle from './components/MTopHandle'
Vue.component('MTopHandle',MTopHandle)
Vue.config.productionTip = false
Vue.mixin({
  methods: {
    mixinGetToken() {
      return {token: 'Bearer ' + (localStorage.token || '')}
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
