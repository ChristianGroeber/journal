import Vue from 'vue';
import Vuex from 'vuex';

// Module
import months from "./modules/months/";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        months,
    }
})