import axios from "axios"

import { postUser } from "@/services/api/user"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("postUser", () => {
    it("Post a user to the API", async () => {
        const data = {
            user: {
                email: "test@test.no",
                firstName: "test",
                lastName: "Testesen",
                phone: 99999999,
                zip: 1111,
                password: "password",
            },
        }
        mockedAxios.post.mockImplementationOnce(() => Promise.resolve(data))

        await expect(
            postUser(
                "test@test.no",
                "test",
                "Testesen",
                99999999,
                1111,
                "password"
            )
        ).resolves.toEqual(true)
    })

    it("Post errendously data to the API", async () => {
        const data = {
            user: {
                email: "test@test.no",
                firstName: "test",
                lastName: "Testesen",
                phone: 99999999,
                zip: 1111,
                password: "password",
            },
        }
        mockedAxios.post.mockImplementationOnce(() => Promise.reject(data))

        await expect(
            postUser(
                "test@test.no",
                "test",
                "Testesen",
                99999999,
                1111,
                "password"
            )
        ).resolves.toEqual(false)
    })
})
