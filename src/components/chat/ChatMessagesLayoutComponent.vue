<template>
    <div ref="chatContainer" style="overflow: scroll">
        <text-chat-message-component
            :message="m"
            v-for="m in props.messages"
            :key="m.time"
        ></text-chat-message-component>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue"
import { ChatMessage } from "@/types/IfcChatMessageInterface"
import TextChatMessageComponent from "@/components/chat/message/TextChatMessageComponent.vue"

const props = defineProps<{
    messages: ChatMessage[]
}>()
const chatContainer = ref<HTMLDivElement>()

watch(
    () => props.messages,
    async () => {
        setTimeout(() => {
            chatContainer.value!.scrollTop = chatContainer.value!.scrollHeight
        }, 100)
    }
)
</script>
