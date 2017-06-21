<template>
    <v-container>
        <div>Logged as: {{ $store.state.user.name }}</div>

        <ul>
            <!-- <li><router-link></router-link></li> -->
        </ul>

        <transition name="fade" mode="out-in" appear>
            <router-view></router-view>
        </transition>

    </v-container>
</template>

<script>
	export default {
		data(){
            return {
            	name:''
            }
		},
        mounted() {

	        console.log(this.name);

        }
	}
</script>