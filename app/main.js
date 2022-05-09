import Vue from 'vue'
import App from './App.vue'
import store from "./src/store";
import {router} from "./src/routes";
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
// import '@vuikit/theme';
// import Editor from "v-markdown-editor";

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuikit)
Vue.use(VuikitIcons)

// Vue.use(Editor);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
