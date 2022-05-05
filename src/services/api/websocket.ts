/* eslint-disable */

import Stomp, { Message } from "webstomp-client"
import SockJS from "sockjs-client"

const socket = new SockJS("http://localhost:8888/ws", null, {})
const client = Stomp.over(socket)
const observers: Array<Function> = []

export function connect(token: string, username: string) {
    return new Promise((resolve) => {
        client.connect(
            {
                Authorization: token,
            },
            () => {
                client.subscribe(`/queue/${username}`, (message: Message) => callObservers(message))

                resolve(true)
            },
            () => {
                resolve(false)
            }
        )
    })
}

function callObservers(message: Message) {
    observers.forEach((f) => f(message))
}

export function addObserver(username: string, callback: (m: Message) => any) {
    observers.push(callback)
}
