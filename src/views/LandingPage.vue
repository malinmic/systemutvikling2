<template>
    <v-container class="h-screen w-100">
        <v-parallax
            src="@/assets/landingpage.png"
            class="h-screen overflow-visible w-100"
        >
            <div class="ma-12 d-flex align-center text-center justify-center">
                <v-img
                    src="@/assets/boco-logo.png"
                    max-height="90"
                    max-width="200"
                ></v-img>
            </div>
            <div class="ma-10 d-flex align-center text-center justify-center">
                <v-col cols="10">
                    <h2 class="text-h6 font-italic">
                        "For å skape et bærekraftig samfunn"
                    </h2>
                </v-col>
            </div>
            <v-col cols="12">
                <div class="d-flex align-center text-center justify-center">
                    <v-text-field
                        label="Hva ønsker du å leie?"
                        placeholder="Hva ønsker du å leie?"
                        variant="outlined"
                        class="white"
                        color="#004aad"
                        bg-color="white"
                        v-model="searchbar"
                    >
                    </v-text-field>
                    <v-btn
                        class="text-white mx-2 mb-10"
                        height="52"
                        width="80"
                        color="#004aad"
                        @click="search"
                    >
                        <v-icon size="25"> mdi-magnify </v-icon>
                    </v-btn>
                </div>
                <div class="d-flex align-center text-center justify-center">
                    <v-btn class="v-btn text-white pa-6" color="#004aad" block>
                        ...eller leie ut?
                    </v-btn>
                </div>
            </v-col>
        </v-parallax>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
const searchbar = ref("")
const router = useRouter()
const search = () => {
    router.push({
        name: "searchlisting",
        params: { searchstring: searchbar.value },
    })
}
</script>

<style scoped></style>
