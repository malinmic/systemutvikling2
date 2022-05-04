<template>
    <v-container class="h-screen w-100">
        <v-card outlined elevation="2" contained-text>
            <h2 class="text-subtitle-1 font-weight-light ma-1 text-left">
                <b>{{ nameRequest }}</b> har spurt om å leie
                <em>{{ rentalObject.title }}</em> fra {{ startDate }} -
                {{ endDate }}
            </h2>
            <v-row justify="center">
                <v-btn
                    type="danger"
                    class="ma-8 mr-12"
                    width="200"
                    @click="reject"
                    >avvis</v-btn
                >
                <v-btn
                    class="text-primary-c ma-8 ml-12"
                    color="primary"
                    width="200"
                    @click="accept"
                    >godta</v-btn
                >
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import {
    acceptRequest,
    getRequest,
    rejectRequest,
} from "@/services/api/request"
import { onMounted, ref } from "vue"
import { useStore } from "vuex"

const nameRequest = ref("")
const rentalObject = ref([])
const startDate = ref("")
const endDate = ref("")

const store = useStore()

const reject = () => {
    console.log("Reject request")
    rejectRequest(2, store.getters.token)
        .then((data) => {
            console.log(data)
        })
        .catch(() => {
            console.log("Error")
        })
}

const accept = () => {
    console.log("Request accepted")
    acceptRequest(2, store.getters.token)
        .then((data) => {
            console.log(data)
        })
        .catch(() => {
            console.log("Error")
        })
}

onMounted(() => {
    //id is hardcoded here, replace when everything is stiched together
    getRequest(2, store.getters.token).then((data) => {
        nameRequest.value = data.listing.firstname
        rentalObject.value = data.listing
        var start: Date = new Date(data.startDate)
        var end: Date = new Date(data.endDate)
        startDate.value = `${start.getDay() + 1}/${start.getMonth() + 1}`
        endDate.value = `${end.getDay() + 1}/${end.getMonth() + 1}`
    })
})
</script>
