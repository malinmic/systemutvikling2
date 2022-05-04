<template>
    <v-form @submit.prevent="submit">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        data-cy="title"
                        label="Tittel"
                        variant="outlined"
                        v-model="title"
                        type="text"
                        :error-messages="errors.title"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-switch
                        data-cy="isFree"
                        v-model="isFree"
                        :label="priceSwitchText"
                        @click="changePriceLabel()"
                        class="mr-5"
                    ></v-switch>
                </v-col>
                <v-col cols="12" sm="6" v-if="isFree">
                    <v-text-field
                        data-cy="price"
                        label="Pris"
                        suffix="kr/dag"
                        variant="outlined"
                        v-model="price"
                        type="number"
                        :error-messages="errors.price"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-switch
                        data-cy="showPhone"
                        v-model="showPhone"
                        :label="phoneSwitchText"
                        @click="changePhoneLabel()"
                    ></v-switch>
                </v-col>
                <v-col cols="12" sm="6" v-if="showPhone">
                    <v-text-field
                        data-cy="phone"
                        label="Mobilnummer"
                        variant="outlined"
                        v-model="phonenumber"
                        :error-messages="errors.phonenumber"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        data-cy="address"
                        label="Adresse"
                        variant="outlined"
                        v-model="address"
                        :error-messages="errors.address"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        data-cy="description"
                        label="Beskrivelse"
                        variant="outlined"
                        v-model="description"
                        :error-messages="errors.description"
                    ></v-textarea>
                </v-col>
                <v-col class="justify-center d-flex" cols="12">
                    <v-btn
                        data-cy="publish"
                        color="primary"
                        class="text-primary-c"
                        type="submit"
                    >
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
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const isFree = ref(false)
const showPhone = ref(false)
const priceSwitchText = ref("Gratis")
const phoneSwitchText = ref("Vis telefonnummer")

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

    if (values.title && values.address)
        postListing(
            store.getters.token,
            values.title,
            description.value,
            price.value,
            values.address,
            phonenumber.value
        ).then((data) => {
            if (data) {
                router.push({ name: "landingpage" })
                store.dispatch("postAlert", {
                    title: "Annonse publisert",
                    message: "Annonsen din er nå publisert",
                    type: "success",
                })
            } else {
                alert("Something went wrong, check that server is running")
            }
        })
})
</script>
