<template>
    <v-card elevation="0" class="mt-2" color="surface-nyance">
        <v-card-actions>
            <v-list-item
                data-cy="profile"
                :prepend-avatar="avatar"
                class="w-100"
                @update-profile-state="updateProfileState"
                :title="profileName"
                :subtitle="email"
            >
                <v-btn
                    data-cy="editbtn"
                    v-model="email"
                    v-if="$store.getters.email === email"
                    @click="$router.push({ name: 'edituser' })"
                    >Rediger bruker</v-btn
                >
            </v-list-item>
            <h2 class="text-subtitle-1 font-weight-light mr-1 text-no-wrap">
                {{ score }}
            </h2>
            <v-icon color="warning" icon="mdi-star" class="mr-2"></v-icon>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useStore } from "vuex"
import { getUser } from "@/services/api/user"

const profileName = ref("")
const email = ref("")
const score = ref("4.8")
const store = useStore()
const isAuthenticated = ref(false)

const avatar = ref(require("@/assets/user-avatar-placeholder.png"))

const updateProfileState = async () => {
    isAuthenticated.value = store.getters.isLoggedIn

    if (isAuthenticated.value) {
        const token = store.getters.token

        let userinfo = await getUser(token)
        await store.dispatch("setUserInfo", userinfo)

        profileName.value = store.getters.fullName
        email.value = store.getters.email
    }
}

updateProfileState()
</script>

<style scoped></style>
