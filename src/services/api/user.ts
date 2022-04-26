import axios from "axios"
import { AUTH_URL, USER_URL } from "@/services/api/urls"

export async function getToken(
    username: String,
    password: String
): Promise<String> {
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

export async function postUser(
    email: String,
    firstName: String,
    lastName: String,
    phone: number,
    zip: number,
    password: String
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
