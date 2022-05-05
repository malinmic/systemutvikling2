<template>
    <CardListComponent
        :title="`Søkeresultater for '${searchstring}'`"
        :listings="listings"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { getListingsByQuery } from "@/services/api/listing"
import CardListComponent from "@/components/listing/CardListComponent.vue"

const route = useRoute()
const listings = ref([])
const searchstring = ref(String(route.params.searchstring))

onMounted(() => {
    getListingsByQuery(searchstring.value).then((data) => {
        listings.value = data
    })
})
</script>
