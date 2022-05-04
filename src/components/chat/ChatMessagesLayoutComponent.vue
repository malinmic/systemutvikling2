<template>
    <v-container v-for="m in props.messages" :key="m.time">
        <text-chat-message-component
            :message="m"
            class="mb-4"
        ></text-chat-message-component>
    </v-container>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { ChatMessage } from "@/types/IfcChatMessageInterface"
import TextChatMessageComponent from "@/components/chat/message/TextChatMessageComponent.vue"

const props = defineProps<{
    messages: ChatMessage[]
}>()
</script>
