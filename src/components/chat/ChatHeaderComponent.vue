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

        <v-btn>
            <v-list-item
                prepend-avatar="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                class="w-100 text-left"
                :title="user"
                :subtitle="activity"
            >
            </v-list-item>
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
const user = ref("Ola Nordmann")
const activity = ref("Aktiv for 10 min siden")

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
