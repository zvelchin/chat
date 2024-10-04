import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, of, switchMap, take } from 'rxjs'
import { AuthState } from '../../auth/models/login.model'
import { ChatState } from '../../channel/models/channel.model'
import { getSelectedChannel } from '../../channel/store/channel.selectors'
import { UserData, UserState } from '../../user/models/user.model'
import { ChannelParticipantData } from '../models/chats-users.model'
import { addUserToChannel } from '../store/chats-users.actions'
import { getAllChannelParticipants } from '../store/chats-users.selector'
import { ChatsUsersApiService } from './chats-users-api.service'

@Injectable({
    providedIn: 'root'
})
export class ChannelUsersService {

    constructor(
        private store: Store<{ auth: AuthState, channelParticipants: ChannelParticipantData, channels: ChatState }>,
        private chatsUserApiService: ChatsUsersApiService,
    ) {
    }

    getUsersToAddInChannels(): Observable<UserData[]> {
        return this.store.select(getSelectedChannel)
            .pipe(
                take(1),
                switchMap((channelId?: string) =>
                    channelId
                        ? this.store.select(getAllChannelParticipants(channelId))
                            .pipe(take(1))
                        : of([])
                ),
                switchMap((users: UserData[]) => {
                    const excludedIds: string[] = users.map((user: UserData) => user.id)
                    return this.chatsUserApiService.getAllUsers(excludedIds)
                })
            )
    }

    addUsersInChannel(channelId: string, userIds: string[]): void {
        this.store.dispatch(addUserToChannel({ channelId, userIds }))
    }
}
