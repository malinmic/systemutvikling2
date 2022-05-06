<template>
    <CardListComponent
        :title="`Søkeresultater for '${searchstring}'`"
        :listings="listings"
    />
    <v-card class="ma-5">
        <v-card-title>Kart</v-card-title>
        <v-card-content>
            <GMapMap
                :center="{ lat: 65.3, lng: 17.0 }"
                :zoom="4"
                map-type-id="terrain"
                style="height: 400px"
            >
                <GMapMarker
                    :key="positions.indexOf(position)"
                    :position="{
                        lat: position.latitude,
                        lng: position.longitude,
                    }"
                    v-for="position in positions"
                />
            </GMapMap>
        </v-card-content>
    </v-card>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue"
import { useRoute } from "vue-router"
import CardListComponent from "@/components/listing/CardListComponent.vue"
import { getListingsByQuery } from "@/services/api/listing"
import { getPositionsFromQuery } from "@/services/api/map"

const route = useRoute()
const listings = ref([])
const searchstring = ref(String(route.params.searchstring))

const positions: Ref<Array<any>> = ref([])

onMounted(() => {
    getListingsByQuery(searchstring.value).then((data) => {
        listings.value = data
        setPositionsFromListings(data)
    })
})

function setPositionsFromListings(listings: Array<any>) {
    listings.forEach((l) => {
        getPositionsFromQuery(l.address).then((position: any) => {
            positions.value.unshift(position?.data[0])
        })
    })
}
</script>
