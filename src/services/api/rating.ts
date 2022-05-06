import axios from "axios"
import { RATING_URL } from "@/services/api/urls"

export async function postRating(
    token: string,
    rating: string,
    review: string,
    requestId: string
) {
    return axios
        .post(
            RATING_URL,
            {
                rating: rating,
                review: review,
                requestId: requestId,
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
            throw `Unable to post review: ${error}`
        })
}

export async function getRatingsForUser(email: string, token: string) {
    return axios
        .get(RATING_URL + `/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.data
        })
        .catch(() => {
            throw "Unable to retrieve user data"
        })
}
