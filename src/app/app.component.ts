import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AppService } from './core/services/app.service'
import { UserDataService } from './modules/user/services/user-data.service'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterContentInit {
    constructor(
        private appService: AppService,
        private userDataService: UserDataService,
    ) {
    }
    @HostListener('window:beforeunload', ['$event'])
    onBeforeUnload() {
        this.userDataService.setUserOffline()
    }

    ngAfterContentInit(): void {
        this.appService.initAuthData()
    }
}
