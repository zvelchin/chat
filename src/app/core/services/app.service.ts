import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { TokenData } from '../../modules/auth/models/login.model'
import { authSuccess } from '../../modules/auth/store/auth.actions'
import { updateOnlineAndLoadUserAction } from '../../modules/user/store/user.actions'
import { LocalStorageKeyItem, LocalStorageService } from './local-storage.service'

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(
        private localStorageService: LocalStorageService,
        private store: Store
    ) {
    }

    initAuthData(): void {
        const authData: TokenData | null = this.localStorageService.getItem<TokenData>(LocalStorageKeyItem.auth)
        if (authData) {
            this.store.dispatch(authSuccess({ token: authData }))
            this.store.dispatch(updateOnlineAndLoadUserAction())
        }
    }

}
