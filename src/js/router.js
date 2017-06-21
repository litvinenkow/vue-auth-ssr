import Vue from 'vue'
import Router from 'vue-router'

import main from '../views/main.vue'
import catalog from '../views/catalog.vue'
import account from '../views/account.vue'
import login from '../views/login.vue'
import orders from '../views/orders.vue'
import empty from '../components/empty.vue'

Vue.use(Router)

let router = new Router({
	hashbang: false,
	linkActiveClass: 'active',
	mode: 'history',
	routes: [
		{
			name: 'index',
			path: '/',
			component: main
		},
		{
			name: 'login',
			path:'/login',
			component:login,
		},
		/**/
		{
			name: 'account',
			path: '/account',
			component: account,
			meta: {auth: true},
			children: [
				/*
				{
					name: 'login',
					path:'login.html',
					component:login,
					//meta: {auth: undefined},
				},
				/**/
				{
					name: 'orders',
					path:'orders.html',
					component:orders,
					//meta: {auth: true}
				}
			]
		},
		{
			name: 'catalog',
			path: '/catalog',
			component: catalog,
			children: [
				{path:':id.html',component:catalog}
			]
		},
		{
			path: '*',
			redirect: '/'
		}

	]
});

export default router;