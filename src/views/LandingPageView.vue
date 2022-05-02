<template>
    <v-parallax src="@/assets/canoe-background.jpg" class="overflow-visible">
        <v-container class="h-screen container">
            <div class="ma-10 d-flex align-center text-center justify-center">
                <v-col cols="12">
                    <h2
                        class="text-h5 font-italic text-white font-weight-light mb-16 mt-5"
                    >
                        "For å skape et bærekraftig samfunn"
                    </h2>
                </v-col>
            </div>
            <v-form @submit.prevent="submit">
                <v-col cols="12">
                    <div
                        class="d-flex align-center text-center justify-center mt-1"
                    >
                        <input
                            placeholder="Hva ønsker du å leie?"
                            class="input"
                            v-model="searchbar"
                        />
                        <v-btn
                            class="text-primary-c ml-3 mb-3"
                            type="submit"
                            height="51"
                            width="75"
                            rounded
                            color="primary"
                            icon="mdi-magnify"
                        >
                        </v-btn>
                    </div>
                    <div
                        class="d-flex align-center text-center justify-center mt-0"
                    >
                        <v-btn
                            class="button v-btn text-primary-c pa-6"
                            rounded
                            color="primary"
                            block
                            @click="listing"
                        >
                            ...eller leie ut?
                        </v-btn>
                    </div>
                </v-col>
            </v-form>
        </v-container>
    </v-parallax>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const searchbar = ref("")
const router = useRouter()

const submit = () => {
    console.log(searchbar)

    router.push({
        name: "listingsearch",
        params: { searchstring: searchbar.value },
    })
}

const listing = () => {
    router.push({
        name: "createlisting",
    })
}
</script>

<style scoped>
.input {
    height: 52px;
    width: 500px;
    background-color: white;
    border: #233847;
    border-radius: 30px;
    margin-bottom: 12px;
    padding-left: 16px;
}
</style>
