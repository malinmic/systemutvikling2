<template>
    <v-dialog v-model="dialog">
        <v-card class="rounded-xl">
            <v-form @submit.prevent="submit">
                <v-col>
                    <v-card-title>
                        Logg inn
                        <v-spacer></v-spacer>
                        <!--Close-button -->
                        <v-btn @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                </v-col>
                <v-container>
                    <v-col>
                        <v-text-field
                            v-model="username"
                            type="text"
                            label="Brukernavn (Epost)"
                            variant="outlined"
                            :error-messages="errors.username"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="password"
                            variant="outlined"
                            label="Passord"
                            :error-messages="errors.password"
                            :type="showPassword ? 'text' : 'password'"
                            :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="showPassword = !showPassword"
                        >
                        </v-text-field>
                    </v-col>

                    <v-btn
                        class="mr-2 text-white"
                        color="#004aad"
                        rounded
                        @click="submit"
                    >
                        Logg inn
                    </v-btn>

                    <v-btn rounded> Registrer deg </v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useForm, useField } from "vee-validate"
import { object, string } from "yup"

export default defineComponent({
    setup() {
        const dialog = ref(false) //Set true to show dialog
        const showPassword = ref(false) //Show / unhide password

        const validationSchema = object({
            username: string().required("Dette feltet er påkrevd").email(),
            password: string().required("Dette feltet er påkrevd"),
        })

        const { handleSubmit, errors } = useForm({
            validationSchema,
        })

        const { value: username } = useField("username")
        const { value: password } = useField("password")

        const submit = handleSubmit((values) => {
            console.log("submit", values)
        })

        return {
            dialog,
            showPassword,
            username,
            password,
            errors,
            submit,
        }
    },
})
</script>
