<template>
    <router-link
        :to="{ name: 'detailedListing', params: { id: props.item.id } }"
        class="link"
    >
        <v-card
            class="ma-0 item"
            min-width="120"
            max-width="120"
            variant="outlined"
        >
            <v-img
                max-width="200"
                max-height="200"
                :src="`http://localhost:8888/image/1`"
            ></v-img>
            <v-card-title>{{ props.item.title }}</v-card-title>
            <v-card-text>
                <div>{{ props.item.price }} kr/uke</div>
            </v-card-text>
        </v-card>
    </router-link>
</template>
<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps<{
    item: Object
}>()
</script>

<style scoped>
.item:hover {
    transform: scale(1.02);
}

.link {
    color: #2c3e50;
    text-decoration: none;
}
</style>
