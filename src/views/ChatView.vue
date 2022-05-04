<template>
    <v-container class="d-flex flex-column pb-16 mb-6 h-screen overflow-auto">
        <div ref="chatContainer" id="chatCont" style="overflow: scroll">
            <ChatMessagesLayoutComponent
                :messages="messages"
            ></ChatMessagesLayoutComponent>
        </div>

        <v-card
            fixed
            bottom
            class="w-100 pb-5 justify-end chat-text-field ml-n4 pr-2 pl-2 border-t pt-4"
        >
            <ChatTextField :send-message-callback="sendChatMessage" />
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import ChatTextField from "@/components/chat/ChatTextFieldComponent.vue"
import ChatMessagesLayoutComponent from "@/components/chat/ChatMessagesLayoutComponent.vue"
import { ref, onMounted } from "vue"
import { ChatMessage } from "@/types/IfcChatMessageInterface"
import { useStore } from "vuex"
import { getChatMessages, postChatMessage } from "@/services/api/chat"
import { subscribe } from "@/services/api/websocket"

const messages = ref([] as ChatMessage[])
const store = useStore()
const chatId = 101

const chatContainer = ref<HTMLDivElement>()

const updateChatLog = () => {
    getChatMessages(store.getters.token, chatId)
        .then((res) => {
            messages.value = []
            messages.value = res.data.messages
        })
        .catch((e) => {
            store.dispatch("postAlert", {
                message: "" + e,
                type: "error",
                title: "Feil ved innhenting av chatlogg",
            })
        })
}

const sendChatMessage = (message: string) => {
    return postChatMessage(store.getters.token, chatId, message)
        .then(() => {
            updateChatLog()

            console.log(chatContainer.value!.scrollTop)
            chatContainer.value!.scrollTop = chatContainer.value!.scrollHeight
        })
        .catch((e) => {
            store.dispatch("postAlert", {
                title: "Feil ved sending av melding",
                message: "" + e,
                type: "error",
            })
        })
}

onMounted(() => {
    updateChatLog()
})

//Subscribe to WebSocket update-calls for new chat-messages
subscribe(store.getters.email, () => {
    updateChatLog()
})
</script>

<style scoped>
.chat-text-field {
}
</style>
