import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios/lib/axios.js'

//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	//plugins: [createPersistedState()],
	state: {
		'user':{id:0,name:''}, // тут пользователя храним
		'catalog_count':0,
		'token':'', // тут храним токен с сервера
		'redirect':'' // используется для хранения переадресации при неавторизованном пользователе на клиенте
	},
	mutations: {

		update_cart(state,payload) {



		},
		set_auth(state,payload){
			state.user=payload.user;
			state.token=payload.token;
		},
		set_redirect(state,payload){
			state.redirect=payload;
		},
		update_state(state,payload) {
			Object.keys(payload).forEach(function(key) {
				state[key]=payload[key];
			});
		}
	},
	actions: {

	},
	getters: {
		catalog_count(state) {
			return state.catalog_count;
		}
	},
	modules: {}
})