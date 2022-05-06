<template>
    <chat-message-component
        :sent-by-me="sentByMe"
        v-if="!awaitingRating || (awaitingRating && sentByMe)"
    >
        <v-container>
            <h3>Leieforholdet er fullført!</h3>

            <p v-if="awaitingRating">
                Gi gjerne en vurdering til <b>{{ emailOfCounterpart }}</b>
            </p>
            <p class="mt-1">{{ nameOfRater }} la igjen en tilbakemelding:</p>

            <v-rating
                v-model="rating"
                class="mt-4"
                color="warning"
                dense
                size="33"
                :disabled="!awaitingRating"
            />
            <v-container class="border mt-2">
                <p class="font-weight-light">john@doe.org:</p>
                Dritt-produkt!</v-container
            >
            <p v-if="warning" class="ml-4 text-error mt-2">
                <b>Rating kan ikke være tom!</b>
            </p>

            <div class="d-flex mt-5" v-if="awaitingRating">
                <v-text-field
                    v-model="review"
                    density="compact"
                    class="mr-2"
                    auto-grow="true"
                    variant="outlined"
                    label="Gi gjerne en kommentar..."
                ></v-text-field>
                <v-btn
                    class="mr-3"
                    height="39"
                    width="42"
                    icon="mdi-send"
                    rounded="lg"
                    color="primary"
                ></v-btn>
            </div>
        </v-container>
    </chat-message-component>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"
import ChatMessageComponent from "@/components/chat/message/ChatMessageComponent.vue"
import { useField } from "vee-validate"
import { useStore } from "vuex"
import { ChatMessage } from "@/types/IfcChatMessageInterface"

const props = defineProps<{
    message: ChatMessage
}>()

console.log(props.message)

const { value: rating } = useField("rating")
const { value: review } = useField("review")

const warning = ref(false)
const store = useStore()

const sentByMe = props.message.from == store.getters.email

const awaitingRating = props.message.content != null
const emailOfCounterpart = ref(props.message.from)
const nameOfRater = sentByMe ? "Du" : "?"

/*const submit = () => {
    if (rating.value === undefined) {
        warning.value = true
    } else {
        warning.value = false
        if (store.getters.isLoggedIn) {
            postRating(
                store.getters.token,
                rating.value as string,
                review.value as string,
                "1"
            )
                .then(() =>
                    store.dispatch("postAlert", {
                        message: "Tilbakemeldingen er registrert!",
                        type: "success",
                    })
                )
                .catch(() => {
                    store.dispatch("postAlert", {
                        message: `Registrering av tilbakemelding feilet!`,
                        type: "error",
                    })
                })
        } else {
            console.log("ikke logget inn")
        }
    }
}*/
</script>
