export type MessageState = {
    messages: MessageStateData
}

export type MessageStateData = {
    [key: string]: MessageData[]
}

export type MessageData = {
    id: string
    from_user: string
    content: string
    channel_id: string
}
