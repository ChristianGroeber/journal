import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import MonthList from "./components/MonthList";
// import EditEntry from "./components/EditEntry";
import NotFound from './components/error/NotFound';

const routes = [
    {
        path: '/',
        name: "Home",
        component: MonthList,
    },
    // {
    //     path: '/edit',
    //     name: "Edit",
    //     props: route => ({ entry: route.query.entry }),
    //     component: EditEntry,
    // },
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