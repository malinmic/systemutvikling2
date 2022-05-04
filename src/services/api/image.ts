import axios from "axios"
import { IMAGE_URL } from "./urls"

export async function uploadImage(file: File, token: string) {
    let formData = new FormData()
    formData.append("image", file)
    return axios
        .post(IMAGE_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((e) => {
            return `Unable to upload image, error ${e}`
        })
}
