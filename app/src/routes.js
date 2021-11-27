import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MonthList from "./components/MonthList";
import NotFound from './components/error/NotFound';

const routes = [
    {
        path: '/',
        name: "Home",
        component: MonthList,
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound,
    }
];

export const router = new VueRouter({
    mode: 'history',
    routes,
})