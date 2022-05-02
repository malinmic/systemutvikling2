<template>
    <h3 class="text-h3 mt-3 mb-3 text-center">{{ text }}</h3>
    <v-divider class="mx-10 mb-5" />
</template>

<script setup lang="ts">
import { defineProps } from "vue"

defineProps({
    text: String,
})
</script>
