<template>
    <v-container class="m-6">
        <HeaderComponent :text="`Søkeresultater for '${searchstring}'`" />

        <v-row class="pt-8">
            <v-col cols="6" v-for="(item, index) in listings" :key="index">
                <CardComponent :item="item" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import CardComponent from "@/components/listing/CardComponent.vue"
import { getListingsByQuery } from "@/services/api/listing"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import HeaderComponent from "@/components/HeaderComponent.vue"

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
