<template>
    <div>
        <div class="container">

            <input style="width:100%;" type="text" name="q" :placeholder="search_msg" :value="q" @change.native="search_submit" />

            <div class="catalog_list">

                <v-pagination v-if="pages>1 && count" :length.number="pages" v-model="page" />
            </div>
            
        </div>
    </div>
</template>

<script>

    export default {
    	name : 'catalog',
        data(){
            return {
            	q:'',
	            cat:typeof(this.$store.state.route.params.id)!='undefined'?this.$store.state.route.params.id:'',
                list:[],
                inpage:20,
	            count:0,
                pages:0,
                page:1
            }
        },
	    computed: {
		    search_msg: function(){
			    return 'Поиск по товарам';
		    }
	    },
        methods:{
            plural : function writing(num, words) {
                num += '';
                words = words || ['товар','товарам','товарам'];
                var n = num.substr(-1, 1);
                if (num.length>1) var n2 = num.substr(-2, 1);
                if (n2==1) return words[2];
                if (n==0 || n>=5) return words[2];
                if (n==1) return words[0];
                if (n==2 || n==3 || n==4) return words[1];
            },
            search_submit: function(event) {
                var q=event.target.value;
                if (q!='') {
                    if (q.length>2) {

                    	this.q=q;
                    	this.page=1;
                    	this.filter_products();

                    } else {
                        alert('Слишком короткий поисковый запрос!');
                    }
                }

            },
            change_page: function(page){
            	this.page=page;
	            this.filter_products();
            },
            filter_products:function() {

	            // какой-то код

            }
        },
	    watch: {
		    '$route': function (to, from) {

		    	console.log('changed category');

		    	this.cat=to.params.id;
		    	this.page=1;
		    	this.q='';

			    this.filter_products();

		    },
            page (to, from) {
		    	this.change_page(to);
            }
	    },
        updated() {
        	//console.log('updated');
        },
        mounted() {

	        this.filter_products();

        }
    }
</script>