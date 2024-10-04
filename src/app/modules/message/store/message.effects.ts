import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { exhaustMap, map, withLatestFrom } from 'rxjs'
import { AuthState } from '../../auth/models/login.model'
import { authIdSelector } from '../../auth/store/auth.selectors'
import { ChatState } from '../../channel/models/channel.model'
import { getSelectedChannel } from '../../channel/store/channel.selectors'
import { MessageData } from '../models/message.model'
import { MessageApiService } from '../services/message-api.service'
import { loadMessage, sendMessage, updateMessages } from './message.actions'

@Injectable()
export class MessageEffects {
    loadMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMessage),
            withLatestFrom(this.store.select(getSelectedChannel)),
            exhaustMap(([_, selectedChannelId]) => {
                if (!selectedChannelId) {
                    throw new Error('Channel not selected')
                }
                return this.messageApiService.getMessagesRequest(selectedChannelId)
                    .pipe(
                        map((messages: MessageData[]) =>
                            updateMessages({ channelId: selectedChannelId, messages })
                        ),
                    )
            })
        )
    )

    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendMessage),
            withLatestFrom(
                this.store.select(getSelectedChannel),
                this.store.select(authIdSelector)
            ),
            exhaustMap(([{ content }, selectedChannelId, userId]) => {
                if (!userId) {
                    throw new Error('User id is empty')
                }
                if (!selectedChannelId) {
                    throw new Error('Channel not selected')
                }
                const messageData: Omit<MessageData, 'id'> = {
                    channel_id: selectedChannelId,
                    from_user: userId,
                    content
                }
                return this.messageApiService.sendMessage(messageData)
                    .pipe(
                        map(() => loadMessage()),
                    )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private store: Store<{ channels: ChatState, auth: AuthState }>,
        private messageApiService: MessageApiService,
    ) {
    }
}
