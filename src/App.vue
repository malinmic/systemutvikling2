<template>
    <!-- This is the recommended layout according to the docs. -->
    <v-app>
        <NavigationDrawerComponent />
        <v-main>
            <v-container fluid>
                <!-- Show whatever router view is currently active. -->
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import NavigationDrawerComponent from "@/components/navbar/NavigationDrawerComponent.vue"

export default defineComponent({
    name: "App",
    components: { NavigationDrawerComponent },
    data() {
        return {
            //
        }
    },
})
</script>
