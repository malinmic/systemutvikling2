export interface ChatMessage {
    type: "text"
    time: Date
    from: string
    message?: string
    attachment?: any
}
