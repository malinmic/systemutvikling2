<template>
    <!-- This is the recommended layout according to the docs. -->

    <v-app :theme="theme">
        <NavigationDrawerComponent :transparent="transparentNavBar" />
        <GlobalAlertComponent></GlobalAlertComponent>

        <v-main>
            <!-- Show whatever router view is currently active. -->
            <router-view />
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
    components: {
        NavigationDrawerComponent,
        GlobalAlertComponent,
    },
    async beforeMount() {
        const store = useStore()
        const { cookies } = useCookies()

        if (cookies.isKey("token")) {
            const token = cookies.get("token")
            await store.dispatch("setToken", { token })
            this.$emit("update-login-state")
        }

        if (cookies.isKey("theme")) {
            const theme = cookies.get("theme")
            await store.dispatch("setTheme", { theme })
        }
    },
    computed: {
        transparentNavBar() {
            return this.$router.currentRoute.value.name == "landingpage"
        },
        theme() {
            const store = useStore()
            return store.getters.theme
        },
    },
})
</script>
