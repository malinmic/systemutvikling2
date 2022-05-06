<template>
    <chat-message-component
        :sent-by-me="sentByMe"
        v-if="!awaitingRating || (awaitingRating && sentByMe)"
    >
        <v-container>
            <h3>Leieforholdet er fullført!</h3>

            <p v-if="awaitingRating">
                Gi gjerne en vurdering til <b>{{ props.message.from }}</b>
            </p>
            <p class="mt-1" v-else>
                {{ nameOfRater }} la igjen en tilbakemelding:
            </p>

            <v-rating
                v-model="rating"
                class="mt-4"
                color="warning"
                dense
                size="33"
                :disabled="!awaitingRating"
            />
            <v-container class="border mt-2" v-if="ratingMessage">
                <p class="font-weight-light">{{ nameOfRater }}:</p>
                {{ ratingMessage }}</v-container
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
                    @click="submit"
                ></v-btn>
            </div>
        </v-container>
    </chat-message-component>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, defineEmits } from "vue"
import ChatMessageComponent from "@/components/chat/message/ChatMessageComponent.vue"
import { useField } from "vee-validate"
import { useStore } from "vuex"
import { ChatMessage } from "@/types/IfcChatMessageInterface"
import { putRating } from "@/services/api/rating"

const props = defineProps<{
    message: ChatMessage
}>()
const emit = defineEmits(["update-chat"])

const { value: rating } = useField("rating")
const { value: review } = useField("review")

const warning = ref(false)
const store = useStore()

const sentByMe = props.message.from == store.getters.email

const ratingObject = computed(() => props.message.content)
rating.value = ratingObject.value.rating

const awaitingRating = computed(() => ratingObject.value.rating == null)

const nameOfRater = sentByMe
    ? "Du"
    : computed(() => store.getters.chatReceiverInfo.email)

const ratingMessage = computed(() => props.message.content.review)
const ratingId = ratingObject.value.ratingId

const submit = () => {
    if (rating.value === undefined) {
        warning.value = true
    } else {
        warning.value = false
        putRating(
            store.getters.token,
            parseInt(rating.value as string),
            ratingId,
            review.value as string
        )
            .then(() => {
                emit("update-chat")
            })
            .catch((e) => {
                store.dispatch("postAlert", {
                    title: `Registrering av tilbakemelding feilet!`,
                    message: "" + e,
                    type: "error",
                })
            })
    }
}
</script>