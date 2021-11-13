import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import VueAxios from "vue-axios";
import axios from "axios";
import {router} from "./routes";

Vue.config.productionTip = false

Vue.use(VueAxios, axios);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
