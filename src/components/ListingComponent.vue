<template>
    <v-row>
        <v-col>
            <v-carousel>
                <v-carousel-item>
                    <v-img class="" v-model="listingImage" :src="listingImage">
                    </v-img>
                </v-carousel-item>
            </v-carousel>
        </v-col>
    </v-row>
    <v-spacer />
    <v-row class="container">
        <v-spacer />
        <v-col>
            <v-card-content
                class=""
                v-model="listingTitle"
                :title="listingTitle"
            >
                <h2>{{ listingTitle }}</h2>
                <i>{{ listingPrice }} kr/dagen</i>
            </v-card-content>
        </v-col>
        <v-col>
            <v-card-content v-model="listingDescription">
                {{ listingDescription }}
            </v-card-content>
        </v-col>
    </v-row>
</template>

<script>
import { getListingById } from "@/services/api/listing"
import { useRoute } from "vue-router"
import { defineComponent, ref } from "vue"

export default defineComponent({
    setup() {
        const route = useRoute()
        const id = route.params.id

        const listingImage = ref("")
        const listingTitle = ref("")
        const listingDescription = ref("")
        const listingPrice = ref("")

        const getListing = () => {
            getListingById(id).then((data) => {
                console.log(data)
                listingImage.value = `http://localhost:8888/image/${data.imageId}`
                if (listingImage.value == null) {
                    listingImage.value =
                        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F07%2F20%2F73%2F07207337cc8bba66bf8696082a975890.jpg&f=1&nofb=1"
                }
                listingTitle.value = data.title
                listingDescription.value = data.description
                listingPrice.value = data.price
            })
        }

        getListing()

        return {
            getListing,
            listingImage,
            listingTitle,
            listingDescription,
            listingPrice,
        }
    },
})
</script>

<style scoped>
.container {
    display: flex;
    flex-flow: column wrap;
    flex-basis: auto;
    max-width: 80%;
}
</style>
