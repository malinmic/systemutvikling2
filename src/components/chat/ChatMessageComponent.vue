<template>
    <v-card
        rounded
        elevation="0"
        class="pa-2 pl-4"
        :class="{ 'bg-primary': props.requiresAction }"
        border
    >
        <slot></slot>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps({
    requiresAction: Boolean,
})
</script>
