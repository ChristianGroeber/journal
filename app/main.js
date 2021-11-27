import Vue from 'vue'
import App from './App.vue'
import store from "./src/store";
import {router} from "./src/routes";

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
