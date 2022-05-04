import axios from "axios"
import { REQUEST_URL } from "@/services/api/urls"

export async function postRequest(
    username: string,
    listingId: number,
    startDate: Date,
    endDate: Date,
    message: string,
    accepted: boolean
) {
    return axios
        .post(REQUEST_URL, {
            username: null,
            listingId: listingId,
            startDate: startDate,
            endDate: endDate,
            message: message,
            accepted: accepted,
        })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

export async function getRequest(requestId: number, token: string) {
    return axios
        .get(REQUEST_URL + `/${requestId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return "No request found"
        })
}

export async function acceptRequest(requestId: number, token: string) {
    return axios
        .put(
            REQUEST_URL,
            {
                requestId: requestId,
                accepted: "ACCEPTED",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return "Could not find id or user"
        })
}
export async function rejectRequest(requestId: number, token: string) {
    return axios
        .put(
            REQUEST_URL,
            {
                requestId: requestId,
                accepted: "REJECTED",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return "Could not find id or user"
        })
}
