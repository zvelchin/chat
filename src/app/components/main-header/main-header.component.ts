import { AsyncPipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { map, Observable } from 'rxjs'
import { AuthState } from '../../modules/auth/models/login.model'
import { getCurrentUser } from '../../modules/auth/store/auth.selectors'
import { UserData } from '../../modules/user/models/user.model'

const MENU_ITEM = [
    { key: 'Home', url: '/main', icon: 'home' },
    { key: 'Settings', url: '/user', icon: 'settings' }
]

@Component({
    selector: 'app-main-header',
    standalone: true,
    imports: [
        MatIconButton,
        MatIcon,
        MatTooltip,
        RouterLink,
        AsyncPipe
    ],
    templateUrl: './main-header.component.html',
    styleUrl: './main-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
    username$: Observable<string> = this.store.select(getCurrentUser)
        .pipe(
            map((userData: UserData | null) => userData?.username ?? ''),
        )

    menuItems: any[] = []

    @Output() logoutEmitter: EventEmitter<void> = new EventEmitter()

    constructor(
        private store: Store<{ auth: AuthState }>,
        private router: Router
    ) {
        this.initMenu()
    }

    logout(): void {
        this.logoutEmitter.emit()
    }

    private initMenu(): void {
        const currentUrl = this.router.url
        this.menuItems = [...MENU_ITEM].filter((item) => currentUrl !== item.url)
    }
}
