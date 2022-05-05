<template>
    <h2 class="text-subtitle-1 font-weight-light mr-1 text-no-wrap">
        {{ score }}
    </h2>
    <v-icon color="warning" icon="mdi-star" class="mr-2"></v-icon>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

defineProps({
    score: Number,
})
</script>

<style scoped></style>
