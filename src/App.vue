<template>
    <!-- This is the recommended layout according to the docs. -->
    <v-app>
        <NavigationDrawerComponent
            v-if="!($route.name === 'notification')"
            :transparent="transparentNavBar"
        />
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
import { connect, subscribe } from "@/services/api/websocket"
import NavigationDrawerComponent from "@/components/navbar/NavigationDrawerComponent.vue"
import GlobalAlertComponent from "@/components/GlobalAlertComponent.vue"

export default defineComponent({
    name: "App",
    components: { GlobalAlertComponent, NavigationDrawerComponent },
    async beforeMount() {
        const store = useStore()
        const { cookies } = useCookies()

        if (cookies.isKey("token")) {
            const token = cookies.get("token")
            store.dispatch("setToken", { token })
            this.$emit("update-login-state")
            await connect(token)
        }

        subscribe(store.getters.email, (message) => {
            console.log("New message", message)
        })
    },
    computed: {
        transparentNavBar() {
            return this.$router.currentRoute.value.name == "landingpage"
        },
    },
})
</script>
