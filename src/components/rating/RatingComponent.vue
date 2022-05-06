<template>
    <h2 class="text-subtitle-1 font-weight-light text-no-wrap mt-1">
        {{ rating }}
    </h2>
    <v-icon color="warning" icon="mdi-star" class="mt-1"></v-icon>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

defineProps({
    rating: Number,
})
</script>

<style scoped></style>
