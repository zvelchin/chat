import { AsyncPipe, NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButton } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatList, MatListItem, MatListSubheaderCssMatStyler } from '@angular/material/list'
import { MatTooltip } from '@angular/material/tooltip'
import { Store } from '@ngrx/store'
import { Observable, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { AuthState } from '../../../auth/models/login.model'
import { ChatState } from '../../../channel/models/channel.model'
import { getSelectedChannel } from '../../../channel/store/channel.selectors'
import { UserData } from '../../../user/models/user.model'
import { ChannelParticipantData } from '../../models/chats-users.model'
import { ChannelUsersService } from '../../services/channel-users.service'
import { loadChannelUserList } from '../../store/chats-users.actions'
import { getChannelsParticipantsWithoutUser } from '../../store/chats-users.selector'
import { AddUserToChannelDialogComponent } from '../add-user-to-channel-dialog/add-user-to-channel-dialog.component'

@Component({
    selector: 'app-channel-participants',
    standalone: true,
    imports: [
        AsyncPipe,
        NgTemplateOutlet,
        MatButton,
        MatListSubheaderCssMatStyler,
        MatList,
        MatListItem,
        MatTooltip
    ],
    templateUrl: './channel-participants.component.html',
    styleUrl: './channel-participants.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelParticipantsComponent {
    private addUserDialog: MatDialogRef<AddUserToChannelDialogComponent> | null = null
    selectedChannelId$: Observable<string | undefined> = this.store.select(getSelectedChannel)
    channelUsers$: Observable<UserData[]> = this.selectedChannelId$
        .pipe(
            tap((channelId?: string) => {
                if (channelId) {
                    this.store.dispatch(loadChannelUserList({ channelId }))
                }
            }),
            switchMap((channelId?: string) =>
                channelId ? this.store.select(getChannelsParticipantsWithoutUser(channelId)) : of([])
            )
        )

    constructor(
        private store: Store<{ channels: ChatState, channelParticipants: ChannelParticipantData, auth: AuthState }>,
        private dialog: MatDialog,
        private channelUsersService: ChannelUsersService,
        private destroyRef: DestroyRef
    ) {
    }

    addUser(): void {
        if (this.addUserDialog) {
            return
        }

        this.addUserDialog = this.dialog.open(AddUserToChannelDialogComponent)
        this.addUserDialog.afterClosed()
            .pipe(
                tap(() => this.addUserDialog = null),
                withLatestFrom(this.selectedChannelId$),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(([userIds, channelId]: [string[], string | undefined]) => {
                if (userIds?.length && channelId) {
                    this.channelUsersService.addUsersInChannel(channelId, userIds)
                }
            })
    }
}
