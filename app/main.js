import Vue from 'vue'
import App from './App.vue'
import store from "./src/store";
import {router} from "./src/routes";
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuetify from 'vuetify';
// import Editor from "v-markdown-editor";

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuetify)

// Vue.use(Editor);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
})

new Vue({
  store,
  router,
  render: h => h(App),
  vuetify: new Vuetify(),
}).$mount('#app')
