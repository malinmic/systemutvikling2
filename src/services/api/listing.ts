import axios from "axios"
import { LISTING_URL } from "@/services/api/urls"

export async function postListing(
    token: string,
    title: string,
    description: string,
    price: number,
    address: string,
    imageId: number,
    phone: string
) {
    return axios
        .post(
            LISTING_URL,
            {
                title: title,
                description: description,
                price: price,
                address: address,
                image: imageId,
                phone: phone,
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
        .catch(() => {
            return false
        })
}

export async function putListingById(
    token: string,
    id: number,
    title: string,
    description: string,
    price: number,
    address: string,
    imageId: number,
    phone: string
) {
    return axios
        .put(
            LISTING_URL + `/${id}`,
            {
                title: title,
                description: description,
                price: price,
                address: address,
                image: imageId,
                phone: phone,
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
            console.error(`Unable to put listing: ${error}`)
            return false
        })
}

export async function updateImageByListingId(
    token: string,
    id: number,
    image: number
) {
    return axios
        .put(
            LISTING_URL + `/${id}`,
            { image: image },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            return response.data
        })
        .catch((e) => {
            return `Error: ${e}`
        })
}

export async function getListingById(id: number) {
    return axios
        .get(LISTING_URL + `/${id}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(`Unable to get listing: ${error}`)
            return {}
        })
}

export async function getListings(token: string) {
    return axios
        .get(LISTING_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(`Unable to get listings: ${error}`)
            return {}
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

export async function getListingsByQuery(query: string) {
    return axios
        .get(LISTING_URL + `/search/${query}`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(`Unable to get listings: ${error}`)
            return {}
        })
}

export async function deleteListing(token: string, id: number) {
    return axios
        .delete(LISTING_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return "No id found"
        })
}

export async function getAllListings() {
    return axios
        .get(LISTING_URL)
        .then((response) => {
            return response.data
        })
        .catch(() => {
            throw "Unable to retrieve user data"
        })
}
