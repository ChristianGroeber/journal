import Vue from 'vue'
import App from './src/App.vue'
import store from "./src/store";
import VueAxios from "vue-axios";
import axios from "axios";
import {router} from "./src/routes";

Vue.config.productionTip = false

Vue.use(VueAxios, axios);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
