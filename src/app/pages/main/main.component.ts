import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MatGridList, MatGridTile } from '@angular/material/grid-list'
import { Store } from '@ngrx/store'
import { MainHeaderComponent } from '../../components/main-header/main-header.component'
import { LoginService } from '../../modules/auth/services/login.service'
import {
    ChannelParticipantsComponent
} from '../../modules/channel-participants/components/channel-participants/channel-participants.component'
import { ChannelsListComponent } from '../../modules/channel/components/channels-list/channels-list.component'
import { ChannelDataService } from '../../modules/channel/services/channel-data.service'
import { MessagesComponent } from '../../modules/message/components/messages/messages.component'
import { UserState } from '../../modules/user/models/user.model'
import { UserDataService } from '../../modules/user/services/user-data.service'

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        MainHeaderComponent,
        AsyncPipe,
        ChannelsListComponent,
        ChannelParticipantsComponent,
        MessagesComponent,
        MatGridList,
        MatGridTile
    ],
    providers: [
        ChannelDataService
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
    constructor(
        private userDataService: UserDataService,
        private loginService: LoginService
    ) {
    }

    ngOnInit(): void {
        this.userDataService.loadUserData()
    }

    logoutHandler(): void {
        this.loginService.logout()
    }
}
