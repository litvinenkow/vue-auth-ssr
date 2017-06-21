<template>
    <div>

        <v-btn @click.native.stop="showModal = !showModal">Модальное окно</v-btn>
        <v-modal v-model="showModal">
            <v-card>
                <v-card-row>
                    <h3>Карточка</h3>
                </v-card-row>
                <v-card-row actions>
                    <v-btn @click.native="showModal = false">Закрыть</v-btn>
                </v-card-row>
            </v-card>
        </v-modal>

    </div>
</template>

<script>

	export default {
		data () {
			return {
				showModal: false
			}
		},
		components: {

        }
	}

</script>

<style>
    .modal .card {
        margin:0;
    }
</style>