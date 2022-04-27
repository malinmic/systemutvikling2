import axios from "axios"
import { LISTING_URL } from "./urls"

export async function postListing(
    title: string,
    description: string,
    price: number,
    address: string,
    phone: string
) {
    return axios
        .post(LISTING_URL, {
            title: title,
            description: description,
            price: price,
            address: address,
            phone: phone,
            user: null,
        })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

export async function getListingById(id: number) {
    return axios
        .get(LISTING_URL + `/${id}`)
        .then((response) => {
            return response.data
        })
        .catch(() => {
            throw "Unable to retrieve listing data."
        })
}

export async function getPersonalListings(token: string) {
    return axios
        .get(LISTING_URL + "/user", {
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
