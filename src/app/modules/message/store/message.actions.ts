import { createAction, props } from '@ngrx/store'
import { MessageData } from '../models/message.model'

enum MessageActions {
    loadMessages = 'LOAD_MESSAGES',
    updateMessages = 'UPDATE_MESSAGES',
    sendMessage = 'SEND_MESSAGE',
}

export const loadMessage = createAction(MessageActions.loadMessages)
export const updateMessages = createAction(MessageActions.updateMessages, props<{
    channelId: string,
    messages: MessageData[]
}>())
export const sendMessage = createAction(MessageActions.sendMessage, props<{ content: string }>())
