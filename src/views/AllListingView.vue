<template>
    <v-row>
        <v-col
            class="d-flex flex-col mb-10 justify-center"
            v-for="(item, index) in listing"
            :key="index"
            xs="auto"
            cols="6"
        >
            <CardComponent :item="item" />
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import CardComponent from "@/components/listingComponent/CardComponent.vue"
import { getPersonalListings } from "@/services/api/listing"
import { onMounted, ref } from "vue"
import { useStore } from "vuex"

const store = useStore()
const listings = ref([])

const getListingsPersonal = () => {
    getPersonalListings(store.getters.token).then((data) => {
        listings.value = data
    })
}

onMounted(() => {
    getListingsPersonal
})
</script>
