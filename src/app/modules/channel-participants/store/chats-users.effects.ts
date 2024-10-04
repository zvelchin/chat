import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { exhaustMap, map, switchMap } from 'rxjs'
import { AuthState } from '../../auth/models/login.model'
import { UserData } from '../../user/models/user.model'
import { saveUsersData } from '../../user/store/user.actions'
import { ChatsUsersApiService } from '../services/chats-users-api.service'
import { addUserToChannel, loadChannelUserList, updateChannelUserList } from './chats-users.actions'

@Injectable()
export class ChatsUsersEffects {
    loadChannelUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadChannelUserList),
            exhaustMap(({ channelId }) => {
                return this.chatsUserApiService.getChannelsUsers(channelId)
                    .pipe(
                        switchMap((usersData: UserData[]) => {
                            return [
                                updateChannelUserList({ channelId, usersData }),
                                saveUsersData({ data: usersData })
                            ]
                        })
                    )
            })
        )
    )

    addUsersToChannels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUserToChannel),
            exhaustMap(({ channelId, userIds }) => {
                return this.chatsUserApiService.addUserToChannelRequest(channelId, userIds)
                    .pipe(
                        map(() => loadChannelUserList({ channelId }))
                    )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private store: Store<{ auth: AuthState }>,
        private chatsUserApiService: ChatsUsersApiService,
    ) {
    }
}
