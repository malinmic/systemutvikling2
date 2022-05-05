import axios from "axios"
import { CHAT_URL } from "@/services/api/urls"

export async function getChatMessages(token: string, chatId: number) {
    return axios.get(CHAT_URL + `/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function postChatMessage(
    token: string,
    chatId: number,
    message: string
) {
    return axios.post(
        CHAT_URL + `/${chatId}`,
        {
            message: message,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}
