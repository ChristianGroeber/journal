import Vue from 'vue'
import App from './App.vue'
import store from "./src/store";
import {router} from "./src/routes";
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
import VueMeta from 'vue-meta';
import fa from './src/components/fa';

Vue.component('fa', fa)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuikit)
Vue.use(VuikitIcons)
Vue.use(VueMeta)

const app = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

export default app;
