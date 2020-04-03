import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './plugins/axios'
import './plugins/highlight'
import './plugins/global'
import './plugins/element.js'
import './styles/style.scss'
import './styles.scss'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  // mounted() {
  //   document.dispatchEvent(new Event('render-event'))
  // },
}).$mount("#app");
