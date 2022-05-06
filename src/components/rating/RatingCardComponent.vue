<!-- The component for rating card-->
<template>
    <v-card class="ma-4" height="90" color="primary-c">
        <v-list-item
            :title="`Leie #${rating?.requestId}`"
            :subtitle="rating?.review"
            class="w-100"
        >
            <!-- Uses the component for rating-->
            <RatingComponent :rating="rating?.rating" />
        </v-list-item>
    </v-card>
</template>

<script lang="ts" setup>
/** Imports: */
import { defineProps } from "vue"
import RatingComponent from "@/components/rating/RatingComponent.vue"

defineProps({
    rating: Object,
})
</script>
