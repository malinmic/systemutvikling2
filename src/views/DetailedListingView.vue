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

<script lang="ts">
// Components
import ListingComponent from "@/components/ListingComponent.vue"
import { defineComponent } from "vue"
import sendRequestComponent from "@/components/sendRequestComponent.vue"
export default defineComponent({
    name: "DetailedListingView",

    components: {
        ListingComponent,
        sendRequestComponent,
    },
})
</script>
