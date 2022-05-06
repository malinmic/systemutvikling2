<template>
    <v-card class="mx-2 mt-2" color="primary-c">
        <v-list-item
            :title="`Leie #${rating?.requestId}`"
            :subtitle="rating?.review"
            class="w-100"
        >
            <RatingComponent :score="rating?.rating" />
        </v-list-item>
    </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue"
import RatingComponent from "@/components/rating/RatingComponent.vue"

defineProps({
    rating: Object,
})
</script>

<style scoped></style>
