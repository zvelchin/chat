import { createAction, props } from '@ngrx/store'
import { UserData } from '../../user/models/user.model'

enum ChatsUsersActions {
    loadChannelUserList = 'LOAD_CHANNEL_USER_LIST',
    updateChannelUserList = 'UPDATE_CHANNEL_USER_LIST',
    addUserInChannel = 'ADD_USER_IN_CHANNEL',
}

export const loadChannelUserList = createAction(ChatsUsersActions.loadChannelUserList, props<{ channelId: string }>())
export const updateChannelUserList = createAction(ChatsUsersActions.updateChannelUserList, props<{ channelId: string, usersData: UserData[] }>())
export const addUserToChannel = createAction(ChatsUsersActions.addUserInChannel, props<{ channelId: string, userIds: string[] }>())
