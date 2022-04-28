<template>
    <!-- This is the recommended layout according to the docs. -->
    <v-app>
        <NavigationDrawerComponent />
        <GlobalAlertComponent></GlobalAlertComponent>

        <v-main>
            <v-container>
                <!-- Show whatever router view is currently active. -->
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useStore } from "vuex"
import { useCookies } from "vue3-cookies"
import NavigationDrawerComponent from "@/components/navbar/NavigationDrawerComponent.vue"
import GlobalAlertComponent from "@/components/GlobalAlertComponent.vue"

export default defineComponent({
    name: "App",
    components: { GlobalAlertComponent, NavigationDrawerComponent },
    beforeMount() {
        const store = useStore()
        const { cookies } = useCookies()

        if (cookies.isKey("token")) {
            const token = cookies.get("token")
            store.dispatch("setToken", { token })
            this.$emit("update-login-state")
        }
    },
})
</script>
