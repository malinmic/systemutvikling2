<template>
    <v-container>
        <v-row>
            <v-col>
                <listing-component />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <send-request-component />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import ListingComponent from "@/components/listing/ListingComponent.vue"
import SendRequestComponent from "@/components/SendRequestComponent.vue"
</script>
