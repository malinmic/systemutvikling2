<template>
    <div class="text-center">
        <h2>Mine annonser</h2>
    </div>
    <v-row>
        <v-col
            class="d-flex flex-col mb-10 justify-center"
            v-for="(item, index) in listings"
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

onMounted(() => {
    getPersonalListings(store.getters.token).then((data) => {
        listings.value = data
    })
})
</script>
