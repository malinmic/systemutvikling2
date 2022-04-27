import axios from "axios"
import { AUTH_URL, USER_URL } from "@/services/api/urls"

export async function getToken(
    username: string,
    password: string
): Promise<string> {
    return axios
        .post(AUTH_URL, {
            username: username,
            password: password,
        })
        .then((response) => {
            if (!response.data.token) {
                throw "Token from endpoint was empty."
            }

            return response.data.token
        })
        .catch((error) => {
            throw `Unable to retrieve token: ${error}`
        })
}

export async function getUserInfo(token: string) {
    return axios
        .get(USER_URL + "/info", {
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

export async function postUser(
    email: string,
    firstName: string,
    lastName: string,
    phone: number,
    zip: number,
    password: string
) {
    return axios
        .post(USER_URL + `/create`, {
            email: email,
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            zip: zip,
            password: password,
        })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}

export async function editUser(
    email: String,
    firstName: String,
    lastName: String,
    phone: number,
    zip: number,
    password: String
) {
    return axios
        .put(USER_URL, {
            email: email,
            firstname: firstName,
            lastname: lastName,
            phone: phone,
            zip: zip,
            password: password,
        })
        .then(() => {
            return true
        })
        .catch(() => {
            return false
        })
}
