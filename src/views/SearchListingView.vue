<template>
    <div class="text-center">
        <h2>Resultater for</h2>
        <h3>{{ searchstring }}</h3>
    </div>

    <v-row class="pt-8">
        <v-col cols="6" v-for="(item, index) in listings" :key="index">
            <CardComponent :item="item" />
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import CardComponent from "@/components/listingComponent/CardComponent.vue"
import { getListingsByQuery } from "@/services/api/listing"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const listings = ref([])
const searchstring = ref("")

onMounted(() => {
    searchstring.value = String(route.params.searchstring)
    getListingsByQuery(searchstring.value).then((data) => {
        listings.value = data
    })
})
</script>
