<template>
    <v-container>
        <UserCard :rating="average" />
    </v-container>

    <v-tabs fixed-tabs="true" background-color="primary">
        <v-tab @click="tab = `listing`"> Mine annonser </v-tab>

        <v-tab @click="tab = `ratings`"> Mine vurderinger </v-tab>
    </v-tabs>

    <PersonalListingsComponent v-if="tab === `listing`" />
    <AllRatingComponent :ratings="ratings" v-if="tab === `ratings`" />
</template>
<script setup>
import UserCard from "../components/user/UserCardComponent"
import PersonalListingsComponent from "../components/listing/PersonalListingsComponent"
import { ref, onMounted } from "vue"
import AllRatingComponent from "@/components/rating/AllRatingComponent"
import { getRatingsForUser } from "@/services/api/rating"
import { useStore } from "vuex"

const tab = ref("listing")
const store = useStore()
const ratings = ref([])
const average = ref()

onMounted(() => {
    getRatingsForUser(store.getters.email, store.getters.token).then((data) => {
        ratings.value = data.ratings
        average.value = data.average
        console.log(data)
    })
})
</script>
