import {createApp} from 'vue'
import App from './App.vue'
import router from "./src/routes";
import VueAxios from 'vue-axios';
import axios from 'axios';
import {createPinia} from "pinia";
import ElementPlus from 'element-plus';
import * as ElementPlusIcons from '@element-plus/icons-vue';

import PJButtonLink from './src/components/pj/button-link.vue';
import PJNavbar from '@/src/components/pj/navbar.vue';
import PJIcon from '@/src/components/pj/icon.vue';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.component('pj-button-link', PJButtonLink);
app.component('pj-navbar', PJNavbar);
app.component('pj-icon', PJIcon);

for (const [key, component] of Object.entries(ElementPlusIcons)) {
    app.component(key, component);
}

app.mount('#app');
