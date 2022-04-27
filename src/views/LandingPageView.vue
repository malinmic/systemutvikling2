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
            <div>
                <div
                    class="ma-10 d-flex align-center text-center justify-center"
                >
                    <v-col cols="10">
                        <h2 class="text-h6 font-italic">
                            "For å skape et bærekraftig samfunn"
                        </h2>
                    </v-col>
                </div>
                <div id="inputAndButton">
                    <v-col cols="12">
                        <div
                            class="d-flex align-center text-center justify-center"
                        >
                            <v-text-field
                                label="Hva ønsker du å leie?"
                                placeholder="Hva ønsker du å leie?"
                                variant="outlined"
                                class="white ma-0 pa-0"
                                color="#004aad"
                                bg-color="white"
                            ></v-text-field>
                        </div>
                        <div
                            class="d-flex align-center text-center justify-center"
                        >
                            <v-btn
                                class="v-btn text-white pa-6"
                                color="#004aad"
                                block
                                @click="$router.push({ name: 'createlisting' })"
                            >
                                ...eller leie ut?
                            </v-btn>
                        </div>
                    </v-col>
                </div>
            </div>
        </v-parallax>
    </v-container>
</template>
