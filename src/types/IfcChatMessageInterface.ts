export interface ChatMessage {
    type: "text"
    time: Date
    from: string
    content: any
}
