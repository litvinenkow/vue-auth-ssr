<template>
    <v-container>
        <form class="form" @submit.prevent='$root.login(creds)'>
            <div class="form-group">
                <input type="text" class="form-control" name="login" v-model="creds.login" placeholder="Логин">
            </div>
            <br />
            <div class="form-group">
                <input type="password" class="form-control" name="password" v-model="creds.password" placeholder="Пароль">
            </div>
            <br />
            <div class="form-group">
                <label><input type="checkbox" class="form-control" name="remember_me" v-model="creds.remember_me" value=1> Запомнить</label>
            </div>
            <br />
            <div class="form-group">
                <button type="submit" class="btn btn-info btn-block">Войти</button>
            </div>
        </form>
    </v-container>
</template>

<script>
	export default {
		data() {
			return {
				creds: {
					login: '',
					password: '',
                    remember_me:false
				}
			}
		},
        created() {
			// редирект, если авторизован
			if (this.$store.state.user.id) {
				console.log('redirect-login');
				this.$root.redirect();
            }
        }
	}
</script>