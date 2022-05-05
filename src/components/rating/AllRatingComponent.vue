<template>
    <RatingCardComponent
        v-for="(rating, index) in ratings"
        :key="index"
        :rating="rating"
    />
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import RatingCardComponent from "@/components/rating/RatingCardComponent.vue"

defineProps({
    ratings: Object,
})
</script>

<style scoped></style>
