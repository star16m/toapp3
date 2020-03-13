import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.VUE_APP_API_BASE,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/data',
            name: 'data',
            component: () => import('@/views/Data.vue'),
        },
        {
            path: '/site',
            name: 'site',
            component: () => import('@/views/Site.vue'),
        },
        {
            path: '/message',
            name: 'message',
            component: () => import('@/views/Message.vue'),
        },
        {
            path: '/keyword',
            name: 'keyword',
            component: () => import('@/views/Keyword.vue'),
        },
        {
            path: '/site/:siteId',
            name: 'SiteInput',
            props: true,
            component: () => import('@/views/SiteInput.vue'),
        },
        {
            path: '/keyword/input',
            name: 'keywordInput',
            component: () => import('@/views/KeywordInput.vue'),
        },
    ],
});
