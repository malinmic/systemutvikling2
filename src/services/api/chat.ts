import axios from "axios"
import { CHAT_URL } from "@/services/api/urls"

export async function getChatMessages(token: string, chatId: number) {
    return axios.get(CHAT_URL + `/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function getChats(token: string) {
    return axios
        .get(CHAT_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.data
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

export async function getNotificationsByID(id: number) {
    return axios
        .get(CHAT_URL + `/${id}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(`Unable to get notifications: ${error}`)
            return {}
        })
}

export async function markAsRead(token: string, chatId: number) {
    return axios.put(
        CHAT_URL + `/${chatId}/notification`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}
