import { createSelector } from '@ngrx/store'
import { AuthState } from '../../auth/models/login.model'
import { getCurrentUser } from '../../auth/store/auth.selectors'
import { UserData } from '../../user/models/user.model'
import { ChannelParticipantData } from '../models/chats-users.model'

type ChatsUsersState = {
    channelParticipants: ChannelParticipantData,
    auth: AuthState,
}

export const getChannelParticipants = (state: ChatsUsersState) => state.channelParticipants
export const getAllChannelParticipants = (channelId: string) => createSelector(
    getChannelParticipants,
    (channelParticipants: ChannelParticipantData) => {
        return channelParticipants[channelId] ?? []
    }
)
export const getChannelsParticipantsWithoutUser = (channelId: string) => createSelector(
    getCurrentUser,
    getAllChannelParticipants(channelId),
    (currentUser, channelParticipants) => {
        const userId: string | undefined = currentUser?.id
        return channelParticipants.filter((users: UserData) => users.id !== userId)
    }
)
