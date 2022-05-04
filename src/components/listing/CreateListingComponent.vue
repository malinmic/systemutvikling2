<template>
    <v-form @submit.prevent="submit">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Tittel"
                        variant="outlined"
                        v-model="title"
                        type="text"
                        :error-messages="errors.title"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-switch
                        v-model="isFree"
                        :label="priceSwitchText"
                        @click="changePriceLabel()"
                        class="mr-5"
                    ></v-switch>
                </v-col>
                <v-col cols="12" sm="6" v-if="isFree">
                    <v-text-field
                        label="Pris"
                        variant="outlined"
                        v-model="price"
                        type="number"
                        :error-messages="errors.price"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-switch
                        v-model="showPhone"
                        :label="phoneSwitchText"
                        @click="changePhoneLabel()"
                    ></v-switch>
                </v-col>
                <v-col cols="12" sm="6" v-if="showPhone">
                    <v-text-field
                        label="Mobilnummer"
                        variant="outlined"
                        v-model="phonenumber"
                        :error-messages="errors.phonenumber"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Postnummer"
                        variant="outlined"
                        v-model="address"
                        :error-messages="errors.address"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        label="Beskrivelse"
                        variant="outlined"
                        v-model="description"
                        :error-messages="errors.description"
                    ></v-textarea>
                </v-col>
                <v-col>
                    <v-file-input
                        accept="image/*"
                        label="Last opp bilde"
                        @change="imageSelect"
                    ></v-file-input>
                </v-col>
                <v-col class="justify-center d-flex" cols="12">
                    <v-btn color="primary" class="text-primary-c" type="submit">
                        Publiser
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useStore } from "vuex"
import { number, object, string } from "yup"
import { useField, useForm } from "vee-validate"
import { postListing } from "@/services/api/listing"
import { uploadImage } from "@/services/api/image"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const isFree = ref(false)
const showPhone = ref(false)
const priceSwitchText = ref("Gratis")
const phoneSwitchText = ref("Vis telefonnummer")
const imageFile = ref()

const changePriceLabel = () => {
    if (isFree.value) {
        priceSwitchText.value = "Gratis"
    } else {
        priceSwitchText.value = "Ikke gratis, skriv inn pris for leie"
    }
}

const changePhoneLabel = () => {
    if (showPhone.value) {
        phoneSwitchText.value = "Skjul telefonnummer"
    } else {
        phoneSwitchText.value = "Vis telefonnummer, vennligst skriv inn"
    }
}

const imageSelect = (e: Event) => {
    //@ts-ignore
    if (e.target != null) imageFile.value = e.target.files[0]
}

const validationSchema = object({
    title: string().required("Dette feltet er påkrevd"),
    price: number().nullable(),
    phonenumber: string().nullable(),
    description: string().nullable(),
    address: string().required(),
})

const { handleSubmit, errors } = useForm({
    validationSchema,
})

const { value: title } = useField<string>("title")
const { value: price } = useField<number>("price")
const { value: phonenumber } = useField<string>("phonenumber")
const { value: description } = useField<string>("description")
const { value: address } = useField<string>("address")

const submit = handleSubmit((values) => {
    if (!isFree.value) price.value = 0
    if (!showPhone.value) phonenumber.value = ""
    if (values.description == undefined) description.value = ""

    if (imageFile.value) {
        uploadImage(imageFile.value, store.getters.token)
            .then((data) => {
                postListing(
                    store.getters.token,
                    title.value,
                    description.value,
                    price.value,
                    address.value,
                    data.id,
                    phonenumber.value
                )
                    .then(() => {
                        store.dispatch("postAlert", {
                            message: "Endring av annonse gjennomført",
                            type: "success",
                            title: "Annonseoppdatering fullført",
                        })
                        router.push({ name: "personallistingview" })
                    })
                    .catch((e) => {
                        store.dispatch("postAlert", {
                            title: "Endring av annonse feilet",
                            type: "error",
                            message: `En feil førte til at annonsen ikke kunne oppdateres. Grunn: ${e}`,
                        })
                    })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    postListing(
        store.getters.token,
        title.value,
        description.value,
        price.value,
        address.value,
        0,
        phonenumber.value
    )
        .then(() => {
            store.dispatch("postAlert", {
                title: "Annonse publisert",
                message: "Annonsen din er nå publisert",
                type: "success",
            })
            router.push({ name: "personallistingview" })
        })
        .catch((e) => {
            store.dispatch("postAlert", {
                title: "Oppretting av annonse feilet",
                type: "error",
                message: `En feil førte til at annonsen ikke kunne opprettes. Grunn: ${e}`,
            })
        })
})
</script>
