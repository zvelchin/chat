import { createReducer, on } from '@ngrx/store'
import { ChannelParticipantData } from '../models/chats-users.model'
import { updateChannelUserList } from './chats-users.actions'

const initialState: ChannelParticipantData = {}

export const chatsUserReducer = createReducer(
    initialState,
    on(updateChannelUserList, (state: ChannelParticipantData, { channelId, usersData }) => {
        const updatedState: ChannelParticipantData = Object.assign({}, state)
        updatedState[channelId] = usersData
        return updatedState
    })
)
