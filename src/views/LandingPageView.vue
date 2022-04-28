<template>
    <v-container class="h-screen container overflow-visible">
        <div class="pt-16">
            <div class="ma-10 d-flex align-center text-center justify-center">
                <v-col cols="12">
                    <h2
                        class="text-h5 font-italic text-white font-weight-light mb-16 mt-5"
                    >
                        "For å skape et bærekraftig samfunn"
                    </h2>
                </v-col>
            </div>
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
                        class="text-white ml-3 mb-3"
                        height="51"
                        width="75"
                        rounded
                        color="#233847"
                        @click="search"
                    >
                        <v-icon size="25"> mdi-magnify </v-icon>
                    </v-btn>
                </div>
                <div
                    class="d-flex align-center text-center justify-center mt-0"
                >
                    <v-btn
                        class="button v-btn text-white pa-6"
                        rounded
                        color="#233847"
                        block
                        @click="listing"
                    >
                        ...eller leie ut?
                    </v-btn>
                </div>
            </v-col>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const searchbar = ref("")
const router = useRouter()

const search = () => {
    console.log(searchbar)

    router.push({
        name: "ListingSearch",
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

.container {
    background-image: url("~@/assets/canoe-background.jpg");
    background-size: cover;
    position: fixed;
    overflow: visible;
    top: 0;
    left: 0;
}
</style>
