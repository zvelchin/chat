import { UserData } from '../../user/models/user.model'

export type ChannelParticipantData = {
    [key: string]: UserData[]
}
