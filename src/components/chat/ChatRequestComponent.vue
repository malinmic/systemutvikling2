<template>
    <v-container class="h-screen w-100">
        <v-card outlined elevation="2" contained-text>
            <h2 class="text-subtitle-1 font-weight-light ma-1 text-left">
                <b>{{ rentalObject.firstname }}</b> har spurt om å leie
                <em>{{ rentalObject.title }}</em> fra {{ startDate }} -
                {{ endDate }}
            </h2>
            <v-row justify="center">
                <v-btn
                    data-cy="reject"
                    type="danger"
                    class="ma-8 mr-12"
                    width="200"
                    @click="reject"
                    >avvis</v-btn
                >
                <v-btn
                    data-cy="accept"
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

const rentalObject = ref({ title: "" as string, firstname: "" as string })
const startDate = ref("")
const endDate = ref("")

const store = useStore()

const reject = () => {
    rejectRequest(2, store.getters.token)
        .then((data) => {
            console.log(data)
        })
        .catch(() => {
            console.error("Error rejecting request")
        })
}

const accept = () => {
    acceptRequest(2, store.getters.token)
        .then((data) => {
            console.log(data)
        })
        .catch(() => {
            console.error("Error accepting request")
        })
}

onMounted(() => {
    //id is hardcoded here, replace when everything is stiched together
    getRequest(2, store.getters.token)
        .then((data) => {
            rentalObject.value = data.listing
            var start: Date = new Date(data.startDate)
            var end: Date = new Date(data.endDate)
            startDate.value = `${start.getDay() + 1}/${start.getMonth() + 1}`
            endDate.value = `${end.getDay() + 1}/${end.getMonth() + 1}`
        })
        .catch((e) => {
            console.error(e)
        })
})
</script>
