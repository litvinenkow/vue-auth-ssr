
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './js/store'

import router from './js/router'
import { sync } from 'vuex-router-sync'
import axios from 'axios/lib/axios.js'
import VueAxios from 'vue-axios'

sync(store, router)

Vue.use(Vuetify)
Vue.use(VueAxios, axios)

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.router=router;
Vue.axios=axios;

Vue.axios.interceptors.request.use(function (config) {
	var token = store.state.token;
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token; // здесь мы кладём токен, если имеется в заголовки, потом если надо их ловим уже на сервере
	}
	return config;
}, function (err) {
	return Promise.reject(err);
});

const app = new Vue(Vue.util.extend({
  router,
  store
}, App))

if (!app.$isServer) {
	//console.log('--- объект store из app.js ---');
	//console.log(app.$store);
}

// глобальный хук авторизации и редиректа
router.beforeEach((to, from, next) => {
	function handleAuth(token) {
		if(token != null && token != '') {
			next();
		} else {
			console.log('redirect-router');
			if (!app.$store.state.redirect) {
				app.$store.commit('set_redirect',to.path);
			}
			//console.log(app.$store.state);
			router.push({'name':'login'});
		}
	}
	if (to.matched.some(record => record.meta.auth)) {
		//console.log(store.state);
		return handleAuth(store.state.token);
	} else {
		return next();
	}
});

export { app, router, store }
