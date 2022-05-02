import axios from "axios"
import { LISTING_URL } from "@/services/api/urls"

export async function postRequest(
    username: string,
    listingId: number,
    startDate: Date,
    endDate: Date,
    message: string,
    accepted: boolean
) {
    return axios
        .post(LISTING_URL + "/request", {
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
