import { createSelector } from '@ngrx/store'
import { ChannelData, ChatState } from '../models/channel.model'

type ChatSelectorState = {
    channels: ChatState
}

export const getAllChannels = (state: ChatSelectorState) => state.channels.channels ?? []

export const getChannelById = (channelId: string) => createSelector(
    getAllChannels,
    (channels: ChannelData[]) =>
        channels.find((channel: ChannelData) => channel.id === channelId)
)

export const getSelectedChannel = (state: ChatSelectorState) => state.channels.selectedChannelId
export const getSelectedChannelInfo = createSelector(
    getAllChannels,
    getSelectedChannel,
    (channels: ChannelData[], selectedId: string | undefined) => {
        return channels.find((channel: ChannelData) => channel.id === selectedId)
    })
