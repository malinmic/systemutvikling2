<template>
    <v-navigation-drawer width="350" app v-model="isNavigationOpen">
        <LoginPopup
            v-model="showPopup"
            @update-login-state="updateLoginState"
        ></LoginPopup>
        <v-list>
            <v-list-item
                v-if="isAuthenticated"
                :prepend-avatar="avatar"
                :title="fullName"
                :subtitle="email"
                value="profile"
                data-cy="navdrawer-user-card"
            />
            <v-list-item
                @click="showPopup = true"
                v-else
                :prepend-avatar="avatar"
                title="Logg Inn"
                value="login"
                data-cy="navdrawer-login-button"
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
                data-cy="navbar-user-avatar"
            />
        </v-btn>

        <v-btn
            text
            v-else
            @click="showPopup = true"
            data-cy="navbar-login-button"
        >
            <v-icon icon="mdi-login" class="mr-1" />
            Logg Inn
        </v-btn>
    </v-app-bar>
</template>
<script setup lang="ts">
import { ref } from "vue"
import LoginPopup from "@/components/LoginPopup.vue"
import { useStore } from "vuex"

//const router = useRouter()
const store = useStore()

const showPopup = ref(false)

const isNavigationOpen = ref(true)
const isAuthenticated = ref(false)
const fullName = ref("")
const email = ref("")

const updateLoginState = () => {
    isAuthenticated.value = store.getters.isLoggedIn
    fullName.value = store.getters.fullName
    email.value = store.getters.email
}

updateLoginState()

const avatar = ref(require("@/assets/user-avatar-placeholder.png"))
</script>
