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
                    class="mt-2"
                    data-cy="editbtn"
                    size="small"
                    variant="contained-text"
                    v-if="store.getters.email === email"
                    @click="$router.push({ name: 'edituser' })"
                    prepend-icon="mdi-pencil"
                    >Rediger</v-btn
                >
            </v-list-item>
            <RatingComponent :rating="rating"></RatingComponent>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"
import RatingComponent from "@/components/rating/RatingComponent.vue"
import { useStore } from "vuex"
import { getUser } from "@/services/api/user"

const profileName = ref("")
const email = ref("")
const score = ref("")
const store = useStore()
const isAuthenticated = ref(false)

defineProps({
    rating: Number,
})
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

const updateScore = async () => {
    score.value = store.getters.score
}

updateProfileState()
</script>

<style scoped></style>
