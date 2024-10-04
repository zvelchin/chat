import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { exhaustMap, map, withLatestFrom } from 'rxjs'
import { AuthState } from '../../auth/models/login.model'
import { authIdSelector } from '../../auth/store/auth.selectors'
import { AddChannelData, AddChannelDialogData, ChannelData } from '../models/channel.model'
import { ChannelApiService } from '../services/channel-api.service'
import { addChannel, loadChannelListAction, saveChannelListAction } from './channel.actions'

@Injectable()
export class ChannelEffects {
    loadChannels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadChannelListAction),
            withLatestFrom(this.store.select(authIdSelector)),
            exhaustMap(([_, userId]: [Action, string | undefined]) => {
                if (!userId) {
                    throw new Error('userId is empty')
                }
                return this.chatApiService.getAllChannelsData(userId)
                    .pipe(
                        map((channelData: ChannelData[]) =>
                            saveChannelListAction({ data: channelData })
                        )
                    )
            })
        )
    )

    addChannel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addChannel),
            withLatestFrom(this.store.select(authIdSelector)),
            exhaustMap(([{ data }, userId]: [{ data: AddChannelDialogData }, string | undefined]) => {
                if (!userId) {
                    throw new Error('User id is empty')
                }

                const fullData: AddChannelData = {
                    name: data.name,
                    user_id: userId,
                }
                return this.chatApiService.addChannel(fullData)
                    .pipe(
                        map(() => loadChannelListAction())
                    )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private store: Store<{ auth: AuthState }>,
        private chatApiService: ChannelApiService,
    ) {
    }
}
