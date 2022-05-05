<template>
    <CardListComponent title="Mine annonser" :listings="listings" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useStore } from "vuex"
import { getPersonalListings } from "@/services/api/listing"
import CardListComponent from "@/components/listing/CardListComponent.vue"

const store = useStore()
const listings = ref([])

onMounted(() => {
    getPersonalListings(store.getters.token).then((data) => {
        listings.value = data
    })
})
</script>
