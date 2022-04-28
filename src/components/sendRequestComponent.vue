<template>
    <v-card class="rounded-xl" elevation="2">
        <v-form @submit.prevent="submit">
            <v-card-title> Forespør leie </v-card-title>
            <v-container>
                <v-row>
                    <v-col>
                        <v-textarea
                            v-model="message"
                            type="text"
                            label="Melding"
                            variant="outlined"
                        >
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="startDate"
                                    label="Startdato"
                                    prepend-icon="mdi-calendar"
                                    type="date"
                                    :error-messages="errors.startDate"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="endDate"
                                    label="Sluttdato"
                                    prepend-icon="mdi-calendar"
                                    type="date"
                                    :error-messages="errors.endDate"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            class="mr-2 text-white w-100"
                            color="#004aad"
                            rounded
                            @click="submit"
                            >Send inn forespørsel
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate"
import { boolean, number, object, string } from "yup"
import { postRequest } from "@/services/api/request"
import { useRoute } from "vue-router"

const route = useRoute()

const validationSchema = object({
    username: string(),
    listingId: number(),
    startDate: string().required("Dette feltet er påkrevd"),
    endDate: string().required("Dette feltet er påkrevd"),
    message: string(),
    accepted: boolean(),
})

const { handleSubmit, errors } = useForm({
    validationSchema,
})

const { value: startDate } = useField("startDate")
const { value: endDate } = useField("endDate")
const { value: message } = useField("message")

const submit = handleSubmit((values) => {
    console.log("Submit", values)
    if (
        values.username &&
        values.listingId &&
        values.startDate &&
        values.endDate &&
        values.message &&
        values.accepted
    )
        postRequest(
            values.username,
            ~~route.params.id,
            new Date(values.startDate),
            new Date(values.endDate),
            values.message,
            values.accepted
        )
})
</script>

<style scoped></style>
