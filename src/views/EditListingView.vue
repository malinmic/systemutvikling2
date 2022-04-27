<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h3 class="text-h3 text-center">Hva vil du leie ut?</h3>
                <EditListingComponent />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import EditListingComponent from "@/components/EditListingComponent.vue"
</script>
