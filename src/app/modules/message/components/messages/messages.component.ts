import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewChildren } from '@angular/core'
import { MatCard } from '@angular/material/card'
import { MatFormField } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatList, MatListItem } from '@angular/material/list'
import { Store } from '@ngrx/store'
import { filter, map, Observable, switchMap, tap } from 'rxjs'
import { ChannelData, ChatState } from '../../../channel/models/channel.model'
import { getSelectedChannel, getSelectedChannelInfo } from '../../../channel/store/channel.selectors'
import { MessageData, MessageStateData } from '../../models/message.model'
import { loadMessage, sendMessage } from '../../store/message.actions'
import { getChannelMessages } from '../../store/message.selectors'
import { MessageInputComponent } from '../message-input/message-input.component'
import { MessageItemComponent } from '../message-item/message-item.component'

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        MatFormField,
        MatInput,
        MessageInputComponent,
        MessageItemComponent,
        MatCard,
        MatList,
        MatListItem
    ],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
    @ViewChild('messageCards') messageCards: MatCard | null = null

    selectedChannel$: Observable<string | undefined> = this.store.select(getSelectedChannel)
    channelName$: Observable<string | undefined> = this.store.select(getSelectedChannelInfo)
        .pipe(map((channel: ChannelData | undefined) => channel?.name))

    messages$: Observable<MessageData[]> = this.selectedChannel$
        .pipe(
            filter(Boolean),
            tap(() => this.store.dispatch(loadMessage())),
            switchMap((channelId?: string) =>
                this.store.select(getChannelMessages(channelId))
            )
        )

    constructor(
        private store: Store<{messages: MessageStateData, channels: ChatState}>
    ) {
    }

    onSendEmitter(messageText: string): void {
        if (messageText) {
            this.store.dispatch(sendMessage({ content: messageText }))
        }
    }
}
