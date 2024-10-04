import { createReducer, on } from '@ngrx/store'
import { MessageStateData } from '../models/message.model'
import { updateMessages } from './message.actions'

const initialState: MessageStateData = {}
export const messageReducer = createReducer(
    initialState,
    on(updateMessages, (state, { channelId, messages }) => {
        const updatedState: MessageStateData = Object.assign({}, state)
        updatedState[channelId] = messages
        return updatedState
    })
)
