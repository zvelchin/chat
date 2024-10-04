import { createSelector } from '@ngrx/store'
import { MessageState, MessageStateData } from '../models/message.model'

const selectMessages = (state: MessageState) => state.messages
export const getChannelMessages = (channelId?: string) => createSelector(
    selectMessages,
    (messages: MessageStateData) => channelId ? messages[channelId] : []
)
