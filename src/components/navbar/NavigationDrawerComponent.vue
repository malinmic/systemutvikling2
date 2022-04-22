<template>
    <v-navigation-drawer width="350" app v-model="isNavigationOpen">
        <v-list>
            <v-list-item
                v-if="isAuthenticated"
                :prepend-avatar="avatar"
                :title="fullName"
                value="profile"
            />
            <v-list-item
                v-else
                :prepend-avatar="avatar"
                title="Logg Inn"
                value="login"
            />
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
            <v-list-item
                prepend-icon="mdi-magnify"
                title="Finn noe å leie"
                value="home"
            />

            <v-list-item
                prepend-icon="mdi-plus"
                title="Opprett Annonse"
                value="test"
            />

            <v-list-item
                prepend-icon="mdi-home"
                title="Om BoCo"
                value="about"
            />
        </v-list>
    </v-navigation-drawer>

    <!--Navigation bar-->
    <v-app-bar
        elevation="0"
        class="border-b-sm"
        color="white"
        elevate-on-scroll
    >
        <v-app-bar-nav-icon
            @click="isNavigationOpen = !isNavigationOpen"
            data-test-id="hamburger-menu-button"
        ></v-app-bar-nav-icon>

        <v-img src="@/assets/navbar-logo.png"> </v-img>

        <v-btn icon v-if="isAuthenticated">
            <v-avatar
                :rounded="true"
                size="24"
                :image="avatar"
                class="rounded-circle"
            />
        </v-btn>

        <v-btn text v-else>
            <v-icon icon="mdi-login" class="mr-1" />
            Logg Inn
        </v-btn>
    </v-app-bar>
</template>
<script>
import { ref } from "vue"

export default {
    setup() {
        //const router = useRouter()
        //const store = useStore()

        const isLoginOverlayOpen = ref(false)
        const isNavigationOpen = ref(true)
        const isAuthenticated = ref(false)

        const avatar = ref(require("@/assets/user-avatar-placeholder.png"))
        const fullName = ref("Test Name")

        return {
            isLoginOverlayOpen,
            isNavigationOpen,
            avatar,
            isAuthenticated,
            fullName,
        }
    },
}
</script>
