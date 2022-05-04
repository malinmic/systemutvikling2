<template>
    <v-container>
        <v-row>
            <v-col>
                <listing-component :listing="listing" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card class="rounded-xl">
                    <v-card-title>Kart</v-card-title>
                    <v-card-content>
                        <p><b>Adressen er</b> {{ address }}</p>
                        <br />
                        <GMapMap
                            :center="mapCenter"
                            :zoom="16"
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
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <send-request-component />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { getListingById } from "@/services/api/listing"
import ListingComponent from "@/components/listing/ListingComponent.vue"
import SendRequestComponent from "@/components/SendRequestComponent.vue"
import { getPositionsFromQuery } from "@/services/api/map"

const route = useRoute()
const id = route.params.id as string
const listing = ref()
const address = ref("")

const mapCenter = ref({ lat: 0, lng: 0 })
const positions = ref()

getListingById(id).then((l) => {
    listing.value = l
    address.value = l.address
    getPositionsFromQuery(l.address).then((p: any) => {
        mapCenter.value = {
            lat: p.data[0].latitude,
            lng: p.data[0].longitude,
        }
        positions.value = p?.data
    })
})
</script>
