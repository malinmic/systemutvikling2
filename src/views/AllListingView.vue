<template>
    <v-container class="w-100">
        <HeaderComponent text="Alle annonser" />
        <v-row v-if="listings.length > 0">
            <v-col
                v-for="(item, index) in listings"
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
import { onMounted, ref } from "vue"
import { getAllListings } from "@/services/api/listing"
import CardComponent from "@/components/listing/CardComponent.vue"
import HeaderComponent from "@/components/HeaderComponent.vue"

const listings = ref([])

onMounted(() => {
    getAllListings().then((data) => {
        listings.value = data
    })
})
</script>
