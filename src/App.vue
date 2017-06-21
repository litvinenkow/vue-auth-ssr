<template>
    <v-app class="" top-toolbar left-fixed-sidebar footer>
        <header>
            <v-toolbar>
                <v-toolbar-side-icon class="hidden-md-and-up" @click.native.stop="sidebar = !sidebar"/>
                <v-toolbar-logo><router-link to="/">Главная</router-link></v-toolbar-logo>

                <button @click="show_state()">Показать state</button>

            </v-toolbar>
        </header>
        <main>
            <v-sidebar v-model="sidebar" fixed>

            </v-sidebar>
            <v-content>
                <v-container fluid>
                    <v-progress-linear :active="progress" :indeterminate="true" :height=3 success></v-progress-linear>

                    <transition name="fade" mode="out-in" appear>
                        <router-view></router-view>
                    </transition>

                </v-container>

            </v-content>
        </main>
        <v-footer>
            <router-link v-for="item in footer_links" :to="item.link"><img v-if="item.image" :src="item.image" /><br />{{item.title}}</router-link>
            <a @click="logout()"><br />Выход</a>
            <router-link to="/account/orders.html"><img /><br />Заказы</router-link>
        </v-footer>
    </v-app>
</template>

<script>

	export default {
		mounted(){

			this.update_state(); // апдейтим с сервера наш стор

		},
		data () {

			return {
				loaded:false,
				master_domain: '',
				api_url:'http://localhost:8080/public/api.json',
				sidebar:true,
				footer_links: [
					{ image: '/public/home.jpg', title: 'Главная', link: '/'},
					{ image: '/public/catalog.jpg', title: 'Каталог', link: '/catalog/'},
					{ image: '', title: 'Аккаунт', link: '/account/'},
					{ title: 'Еще',
						link: '/more/',
						dropdown: [
							{title: 'test', link: '/'},
							{title: 'test2', link: '/test/'}
						]
					},
				],
				progress:false
			}
		},
		methods: {
			logout() {
				console.log('logout!');
				this.$cookie.delete('token');
				this.$store.commit('set_auth',{user:{id:0,name:''},token:''});
				this.$router.push({'name':'index'});
				this.update_state();
			},

			login(creds) {
				var self=this;
				self.progress=true;
				if (creds.login && creds.password) {
					this.axios({
						method: 'get', // тут раньше был POST, но нам просто нужно взять json, поэтому GET
                        url: this.$root.api_url,
						data: creds
					}).then(function(response) {
						if (response.data.error) {
							console.log(response.data.error);
                        } else {
							if (response.data.token) {
								self.$cookie.set('token',response.data.token,{expires: 30}); // ,domain:'localhost'
								self.$store.commit('set_auth',response.data);
								self.redirect();
								self.update_state();
								//console.log(self.$cookie.get('token'));
                            } else {
								console.log('No token received!');
                            }
                        }
						self.progress=false;
					});
                } else {
					console.log('No login or password!');
                }
            },
            is_auth:function(){
				return this.$store.state.user.id>0 && this.$store.state.token;
            },
            show_state:function(){
            	console.log(this.$store.state);
            },
            redirect:function(url){
	            var redir=url || this.$store.state.redirect?this.$store.state.redirect:{'name':'account'};
	            //console.log(redir);
	            this.$store.commit('set_redirect','');
	            this.$router.push(redir);
            },
            update_state:function(){

                // какой-то код

            }

		}
	}
</script>
