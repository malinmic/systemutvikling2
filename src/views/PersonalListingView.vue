<template>
    <v-container class="w-100">
        <HeaderComponent text="Mine annonser" />
        <v-row>
            <v-col
                v-for="(item, index) in listings"
                class="justify-center"
                :key="index"
                cols="12"
                sm="6"
                lg="4"
                xl="2"
            >
                <CardComponent :item="item" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import CardComponent from "@/components/listing/CardComponent.vue"
import HeaderComponent from "@/components/HeaderComponent.vue"
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
