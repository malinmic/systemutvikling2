import axios from "axios"
import { AUTH_URL } from "@/services/api/urls"

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
