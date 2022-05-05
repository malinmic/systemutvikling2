<template>
    <v-row class="w-100 mb-4" :justify="sentByMe ? 'end' : 'start'">
        <chat-message-component class="w-75 ml-6 mt-4">
            <h5 class="text-secondary-dimmed font-weight-regular mb-2">
                <b>{{ props.message.from + " " }} </b> {{ timeLabel }}
            </h5>
            <p>{{ props.message.message }}</p>
        </chat-message-component>
    </v-row>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { ChatMessage } from "@/types/IfcChatMessageInterface"
import ChatMessageComponent from "@/components/chat/message/ChatMessageComponent.vue"
import { useStore } from "vuex"

const props = defineProps<{
    message: ChatMessage
}>()

const store = useStore()

const sentByMe = props.message.from == store.getters.email

const dateTime = new Date(props.message.time)
const timeLabel = `${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}, ${dateTime.getHours()}.${dateTime.getMinutes()}`
</script>
