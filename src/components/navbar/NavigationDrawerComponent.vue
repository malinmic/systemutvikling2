<template>
    <v-navigation-drawer width="350" app v-model="isNavigationOpen">
        <LoginPopupComponent
            v-model="showPopup"
            @update-login-state="updateLoginState"
        ></LoginPopupComponent>
        <v-list color="background">
            <v-list-item
                v-if="isAuthenticated"
                @click="$router.push({ name: 'edituser' })"
                :prepend-avatar="avatar"
                :title="fullName"
                :subtitle="email"
                value="profile"
                data-cy="navdrawer-user-card"
            />
            <v-list-item
                v-else
                @click="showPopup = true"
                :prepend-avatar="avatar"
                title="Logg inn"
                value="login"
                data-cy="navdrawer-login-button"
            />
        </v-list>

        <v-divider />

        <v-list nav>
            <v-list-item
                prepend-icon="mdi-magnify"
                title="Finn noe å leie"
                @click="$router.push({ name: 'landingpage' })"
            />

            <v-list-item
                prepend-icon="mdi-animation"
                title="Alle annonser"
                @click="$router.push({ name: 'alllistingview' })"
            />

            <v-list-item
                prepend-icon="mdi-animation"
                title="Mine annonser"
                @click="$router.push({ name: 'personallistingview' })"
            />

            <v-list-item
                prepend-icon="mdi-plus"
                title="Opprett annonse"
                @click="$router.push({ name: 'createlisting' })"
            />

            <v-list-item
                prepend-icon="mdi-help-circle-outline"
                title="Ofte stilte spørsmål"
                @click="$router.push({ name: 'faq' })"
            />
        </v-list>
    </v-navigation-drawer>

    <!--Navigation bar-->
    <v-app-bar
        elevation="0"
        class="border-b-sm"
        border="none"
        elevate-on-scroll
        :class="{ 'bg-transparent': props.transparent }"
    >
        <v-app-bar-nav-icon
            @click="isNavigationOpen = !isNavigationOpen"
            data-test-id="hamburger-menu-button"
        ></v-app-bar-nav-icon>

        <v-img
            src="@/assets/navbar-logo.png"
            @click="$router.push({ name: 'landingpage' })"
            class="h-75 ma-auto"
        />

        <v-btn
            v-if="isAuthenticated"
            @click="$router.push({ name: 'edituser' })"
            icon
        >
            <v-avatar
                :rounded="true"
                size="24"
                :image="avatar"
                class="rounded-circle"
                data-cy="navbar-user-avatar"
            />
        </v-btn>

        <v-btn
            v-else
            text
            @click="showPopup = true"
            data-cy="navbar-login-button"
        >
            <v-icon icon="mdi-login" class="mr-1" />
            Logg inn
        </v-btn>
    </v-app-bar>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue"
import { useStore } from "vuex"
import LoginPopupComponent from "@/components/user/LoginPopupComponent.vue"
import { getUser } from "@/services/api/user"

const store = useStore()
const props = defineProps({
    transparent: Boolean,
})

const showPopup = ref(false)

const isNavigationOpen = ref(true)
const isAuthenticated = ref(false)
const fullName = ref("")
const email = ref("")

const updateLoginState = async () => {
    isAuthenticated.value = store.getters.isLoggedIn

    if (isAuthenticated.value) {
        const token = store.getters.token

        let userinfo = await getUser(token)
        await store.dispatch("setUserInfo", userinfo)

        fullName.value = store.getters.fullName
        email.value = store.getters.email
    }
}

updateLoginState()

const avatar = ref(require("@/assets/user-avatar-placeholder.png"))
</script>
