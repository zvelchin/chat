import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatListOption, MatListSubheaderCssMatStyler, MatSelectionList } from '@angular/material/list'
import { Store } from '@ngrx/store'
import { filter, Observable, tap } from 'rxjs'
import { AddChannelData, ChannelData, ChatState } from '../../models/channel.model'
import { ChannelDataService } from '../../services/channel-data.service'
import { getAllChannels } from '../../store/channel.selectors'
import { AddChannelDialogComponent } from '../add-channel-dialog/add-channel-dialog.component'

@Component({
    selector: 'app-channels-list',
    standalone: true,
    imports: [
        AsyncPipe,
        MatButton,
        MatSelectionList,
        ReactiveFormsModule,
        MatListOption,
        MatListSubheaderCssMatStyler,
    ],
    templateUrl: './channels-list.component.html',
    styleUrl: './channels-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelsListComponent implements OnInit {
    private addDialogRef: MatDialogRef<AddChannelDialogComponent> | null = null
    channelList$: Observable<ChannelData[]> = this.store.select(getAllChannels)
    channelControl: FormControl<string[] | null> = new FormControl(null)

    constructor(
        private store: Store<{ channels: ChatState }>,
        private chatDataService: ChannelDataService,
        private matDialog: MatDialog,
        private destroyRef: DestroyRef,
    ) {
    }

    ngOnInit(): void {
        this.chatDataService.loadChannels()
    }

    addChannel(): void {
        if (this.addDialogRef) {
            return
        }

        this.addDialogRef = this.matDialog.open(AddChannelDialogComponent)
        this.addDialogRef.afterClosed()
            .pipe(
                tap(() => this.addDialogRef = null),
                filter(Boolean),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((data: AddChannelData) => {
                this.chatDataService.addChannel(data)
            })
    }

    onSelectChannel(): void {
        const selected: string | undefined = this.channelControl.value?.toString()
        if (selected) {
            this.chatDataService.selectChannel(selected)
        }
    }
}
