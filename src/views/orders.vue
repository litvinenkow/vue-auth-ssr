<template>

    <div>
        <h3>Спсиок заказов</h3>
        <table>
            <tr>
                <th>ID</th>
                <th>Код клиента</th>
                <th>Сумма заказа</th>
                <th>Сумма доставленного</th>
                <th></th>
            </tr>
        </table>
        <v-pagination v-if="pages>1 && count" :length.number="pages" v-model="page" />
    </div>

</template>

<script>

	export default {
		data(){
			return {
				list:[],
				inpage:20,
				count:0,
				pages:0,
				page:1
			}
		},
		watch: {
			page (to, from) {
				this.change_page(to);
			}
		},
        methods: {
	        change_page: function(page){
		        this.page=page;
		        this.filter_orders();
	        },
	        filter_orders:function() {

		        // какой-то код

	        }
        },
		mounted() {

			this.$root.progress=true;
			this.filter_orders();

		}
	}
</script>