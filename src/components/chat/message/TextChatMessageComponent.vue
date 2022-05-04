<template>
    <chat-message-component class="w-75" :class="{ 'float-right': sentByMe }">
        <h5 class="text-secondary-dimmed font-weight-regular mb-1">
            {{ timeLabel }}
        </h5>
        <p>{{ props.message.message }}</p>
    </chat-message-component>
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

console.log(props.message.from)
const sentByMe = props.message.from == store.getters.email

const dateTime = new Date(props.message.time)
const timeLabel = `${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}, ${dateTime.getHours()}.${dateTime.getMinutes()}`
</script>
