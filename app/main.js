import Vue from 'vue'
import App from './App.vue'
import store from "./src/store";
import {router} from "./src/routes";
// import Editor from "v-markdown-editor";

Vue.config.productionTip = false

// Vue.use(Editor);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
