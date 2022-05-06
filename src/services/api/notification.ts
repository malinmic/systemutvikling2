import axios from "axios"
import { NOTIFICATION_URL } from "@/services/api/urls"

/* Deprecated
export async function getNotificationsByID(id: number) {
    return axios
        .get(NOTIFICATION_URL + `/${id}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(`Unable to get notifications: ${error}`)
            return {}
        })
}
*/

export async function getNotifications(token: string) {
    return axios.get(NOTIFICATION_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function putNotification(token: string, read: boolean) {
    return axios
        .put(
            NOTIFICATION_URL,
            {
                read: read,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(() => {
            return true
        })
        .catch((error) => {
            console.error(`Unable to put notifications: ${error}`)
            return false
        })
}
