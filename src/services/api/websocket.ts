/* eslint-disable */

import Stomp, { Message } from "webstomp-client"
import SockJS from "sockjs-client"

const socket = new SockJS("http://localhost:8888/ws", null, {})
const client = Stomp.over(socket)

export function connect(token: string) {
    return new Promise((resolve) => {
        client.connect(
            {
                Authorization: token,
            },
            () => {
                resolve(true)
            },
            () => {
                resolve(false)
            }
        )
    })
}

export function subscribe(username: string, callback: (m: Message) => any) {
    if (!client.connected) {
        return
    }

    client.subscribe(`/queue/${username}`, (message: Message) => callback(message))
}
