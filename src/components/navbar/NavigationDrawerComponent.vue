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

        <div v-if="!chat">
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
                    prepend-icon="mdi-chat"
                    title="Chat"
                    @click="chat = !chat"
                    ><div v-if="!unread">
                        <v-badge dot color="error" inline />
                    </div>
                </v-list-item>

                <v-list-item
                    prepend-icon="mdi-help-circle-outline"
                    title="Ofte stilte spørsmål"
                    @click="$router.push({ name: 'faq' })"
                />
            </v-list>
        </div>
        <div v-else>
            <v-list nav>
                <v-list-item
                    prepend-icon="mdi-arrow-collapse-left"
                    title="Back"
                    @click="chat = !chat"
                />
                <v-list-item>
                    <NotificationCardComponent />
                </v-list-item>
            </v-list>
        </div>

        <template v-slot:append>
            <v-divider></v-divider>
            <v-list-item class="pa-8">
                <theme-toggle-component></theme-toggle-component>
            </v-list-item>
        </template>
    </v-navigation-drawer>

    <!--Navigation bar-->
    <v-app-bar
        v-if="!isChat"
        elevation="0"
        class="border-b-sm"
        border="none"
        elevate-on-scroll
        :class="{ 'bg-transparent': props.transparent }"
    >
        <v-app-bar-nav-icon
            @click="isNavigationOpen = !isNavigationOpen"
            height="28"
            data-test-id="hamburger-menu-button"
            :class="{ 'text-background': transparent }"
        ></v-app-bar-nav-icon>
        <div v-if="!unread">
            <v-badge dot color="error" class="notification" />
        </div>

        <NavigationBarLogo :transparentMode="transparent"></NavigationBarLogo>

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
            :class="{ 'text-background': transparent }"
        >
            <v-icon icon="mdi-login" class="mr-1" />
            Logg inn
        </v-btn>
    </v-app-bar>

    <v-app-bar
        v-else
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
        <v-icon icon="mdi-alert-circle" class="notification" />

        <v-btn>
            <v-list-item
                prepend-avatar="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                class="w-100 text-left"
                :title="user"
                :subtitle="activity"
                data-cy="navbar-chat-name"
            >
            </v-list-item>
        </v-btn>
    </v-app-bar>
</template>
<script setup lang="ts">
import { ref, defineProps, onUpdated } from "vue"
import { useStore } from "vuex"
import LoginPopupComponent from "@/components/user/LoginPopupComponent.vue"
import { getUser } from "@/services/api/user"
import { useRouter } from "vue-router"
import ThemeToggleComponent from "@/components/navbar/ThemeToggleComponent.vue"
import NavigationBarLogo from "@/components/navbar/NavigationBarLogoComponent.vue"
import NotificationCardComponent from "@/components/notifications/NotificationCardComponent.vue"
import { getNotifications } from "@/services/api/notification"

const store = useStore()
const props = defineProps({
    transparent: Boolean,
})
const router = useRouter()

const showPopup = ref(false)
const isChat = ref(false)

const isNavigationOpen = ref(true)
const isAuthenticated = ref(false)
const fullName = ref("")
const email = ref("")
const chat = ref(false)
const unread = ref(true)

const updateIsChat = () => {
    isChat.value = router.currentRoute.value.path === "/chat"
    console.log(router.currentRoute.value.path)
}

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

onUpdated(() => {
    updateIsChat()
})

const token = store.getters.token
getNotifications(token).then((data) => {
    unread.value = data.unread
})

updateLoginState()

const avatar = ref(require("@/assets/user-avatar-placeholder.png"))
const user = ref("Ola Nordmann")
const activity = ref("Aktiv for 10 min siden")
</script>

<style scoped>
.notification {
    margin-left: -12px;
    margin-bottom: 15px;
}

.pointer:hover {
    cursor: pointer;
}
</style>
