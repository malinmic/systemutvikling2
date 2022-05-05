<template>
    <v-container class="h-screen mt-n16 pt-16">
        <v-container class="d-flex flex-column h-100">
            <ChatMessagesLayoutComponent
                @update-chat="updateChatLog"
                :messages="messages"
                class="h-100"
            ></ChatMessagesLayoutComponent>

            <v-card
                elevation="0"
                class="w-100 justify-end chat-text-field pt-4"
            >
                <ChatTextField :send-message-callback="sendChatMessage" />
            </v-card>
        </v-container>
    </v-container>
</template>

<script lang="ts" setup>
import ChatTextField from "@/components/chat/ChatTextFieldComponent.vue"
import ChatMessagesLayoutComponent from "@/components/chat/ChatMessagesLayoutComponent.vue"
import { ref, onMounted, onUpdated } from "vue"
import { ChatMessage } from "@/types/IfcChatMessageInterface"
import { useStore } from "vuex"
import { getChatMessages, postChatMessage } from "@/services/api/chat"
import { addObserver } from "@/services/api/websocket"
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import { UserAccount } from "@/types/IfcUserAccountInterface"

const messages = ref([] as ChatMessage[])
const store = useStore()
const route = useRoute()
const chatId = parseInt(route.params.id as string)
const receiverInfo = ref()

const updateChatLog = () => {
    return getChatMessages(store.getters.token, chatId)
        .then((res) => {
            receiverInfo.value = res.data.users.filter(
                (u: ChatMessage) => u.from != store.getters.email
            )[0]
            messages.value = []
            messages.value = res.data.messages as ChatMessage[]
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
    if (message != "")
        return postChatMessage(store.getters.token, chatId, message)
            .then(() => {
                updateChatLog()
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
    updateChatLog().then(() => {
        const acc: UserAccount = receiverInfo.value as UserAccount
        store.commit("SET_CHAT_RECEIVER", acc)
    })
})

onBeforeRouteUpdate(() => {
    updateChatLog().then(() => {
        const acc: UserAccount = receiverInfo.value as UserAccount
        store.commit("SET_CHAT_RECEIVER", acc)
    })
})

//Subscribe to WebSocket update-calls for new chat-messages
addObserver(() => {
    updateChatLog()
})
</script>

<style scoped>
.chat-text-field {
}
</style>
