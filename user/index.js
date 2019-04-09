import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './src/views/app.vue'
import qs from 'qs';
import { get, post, put, deleteDate, success, fail } from './utils/http.js'

Vue.prototype.$qs = qs;
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$delete = deleteDate;
Vue.prototype.$success = success;
Vue.prototype.$fail = fail;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import createRouter from './vue-router/router.js'
Vue.use(VueRouter);
const router = createRouter();

new Vue({
    el: "#root",
    router,
    render: h => h(App)
})