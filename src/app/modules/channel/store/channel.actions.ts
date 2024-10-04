import { createAction, props } from '@ngrx/store'
import { AddChannelDialogData, ChannelData } from '../models/channel.model'

enum ChannelActions {
    loadChannelList = 'LOAD_CHANNEL_LIST',
    saveChannelList = 'SAVE_CHANNEL_LIST',
    addChannel = 'ADD_CHANNEL',
    selectChannel = 'SELECT_CHANNEL',
}

export const loadChannelListAction = createAction(ChannelActions.loadChannelList)
export const saveChannelListAction = createAction(ChannelActions.saveChannelList, props<{ data: ChannelData[] }>())
export const addChannel = createAction(ChannelActions.addChannel, props<{ data: AddChannelDialogData }>())
export const selectChannel = createAction(ChannelActions.selectChannel, props<{ id: string }>())
