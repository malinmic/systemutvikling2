<template>
    <v-form @submit.prevent="updateUserInfo">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h3
                        class="text-h3 text-center"
                        style="padding-bottom: 40px"
                    >
                        Rediger informasjon
                    </h3>
                </v-col>
                <v-col class="d-flex flex-row mt-5 .rounded-x1">
                    <v-text-field
                        data-cy="firstname"
                        class="padding"
                        label="Fornavn"
                        placeholder=""
                        variant="outlined"
                        v-model="firstname"
                        type="text"
                        :error-messages="errors.firstname"
                    ></v-text-field>
                    <v-text-field
                        data-cy="lastname"
                        label="Etternavn"
                        placeholder=""
                        variant="outlined"
                        v-model="lastname"
                        type="text"
                        :error-messages="errors.lastname"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        data-cy="email"
                        label="Epost"
                        variant="outlined"
                        placeholder=""
                        v-model="email"
                        :error-messages="errors.email"
                    ></v-text-field>
                    <v-text-field
                        data-cy="phonenumber"
                        label="Mobilnummer"
                        variant="outlined"
                        placeholder=""
                        v-model="phonenumber"
                        :error-messages="errors.phonenumber"
                    ></v-text-field>
                </v-col>
                <v-col class="d-flex flex-row mt-5">
                    <v-text-field
                        data-cy="zipcode"
                        class="padding"
                        label="Postnummer"
                        variant="outlined"
                        placeholder=""
                        v-model="zipcode"
                        :error-messages="errors.zipcode"
                    ></v-text-field>
                    <v-text-field
                        data-cy="city"
                        label="Poststed"
                        variant="outlined"
                        placeholder=""
                        v-model="city"
                        type="text"
                        :error-messages="errors.city"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        data-cy="password"
                        label="Passord"
                        variant="outlined"
                        placeholder=""
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        v-model="password1"
                        :rules="rules"
                        :error-messages="errors.password1"
                    ></v-text-field>
                    <v-text-field
                        data-cy="confirmPassword"
                        label="Gjenta Passord"
                        variant="outlined"
                        placeholder=""
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        @click:append="show2 = !show2"
                        v-model="password2"
                        :error-messages="errors.password2"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-col class="justify-center d-flex" cols="12">
                <v-btn
                    data-cy="editUser"
                    color="#004aad"
                    variant="outlined"
                    type="updateUserInfo"
                    >Lagre endringer</v-btn
                >
            </v-col>
        </v-container>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { object, string, number } from "yup"
import { useForm, useField } from "vee-validate"
import { editUser } from "@/services/api/user"

const show1 = ref(false)
const show2 = ref(false)
//const info = ref("")

const validationSchema = object({
    firstname: string().required("Dette feltet er påkrevd"),
    lastname: string().required("Dette feltet er påkrevd"),
    email: string().required().email("Fyll inn en gyldig mailadresse"),
    phonenumber: number().min(8).required("Dette feltet er påkrevd"),
    zipcode: number().required("Dette feltet er påkrevd"),
    city: string().required("Dette feltet er påkrevd"),
    password1: string().required("Dette feltet er påkrevd").min(6),
    password2: string().required("Dette feltet er påkrevd").min(6),
})

const { handleSubmit, errors } = useForm({
    validationSchema,
    initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: 0,
        zipcode: 0,
        city: "",
        password1: "",
        password2: "",
    },
})

const { value: firstname } = useField("firstname")
const { value: lastname } = useField("lastname")
const { value: email } = useField("email")
const { value: phonenumber } = useField("phonenumber")
const { value: zipcode } = useField("zipcode")
const { value: city } = useField("city")
const { value: password1 } = useField("password1")
const { value: password2 } = useField("password2")

const updateUserInfo = handleSubmit((values) => {
    if (
        values.email &&
        values.firstname &&
        values.lastname &&
        values.phonenumber &&
        values.zipcode &&
        values.password1 &&
        values.password2
    )
        editUser(
            values.email,
            values.firstname,
            values.lastname,
            values.phonenumber,
            values.zipcode,
            values.password2
        )
})
</script>

<style scoped>
.padding {
    margin-right: 20px;
}
.v-text-field {
    border-radius: 40px;
}
</style>
