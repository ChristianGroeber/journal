import Vue from 'vue';
import Vuex from 'vuex';

// Module
import months from "./modules/months/";
import auth from "./modules/auth/";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        months,
        auth,
    }
})