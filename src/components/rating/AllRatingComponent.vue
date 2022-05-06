<template>
    <RatingCardComponent
        v-for="(rating, index) in ratings"
        :key="index"
        :rating="rating"
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useStore } from "vuex"
import { getRatingsForUser } from "@/services/api/rating"
import RatingCardComponent from "@/components/rating/RatingCardComponent"

const store = useStore()
const ratings = ref([])

onMounted(() => {
    getRatingsForUser(store.getters.email, store.getters.token).then((data) => {
        ratings.value = data.ratings
    })
})
</script>

<style scoped></style>
