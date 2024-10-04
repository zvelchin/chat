import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AuthState, LoginFormData } from '../models/login.model'
import { loginAction, logoutAction, resetAuthState } from '../store/auth.actions'

@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(
        private authStore: Store<{ auth: AuthState }>,
    ) {
    }

    resetAuthState(): void {
        this.authStore.dispatch(resetAuthState())
    }

    login(loginData: LoginFormData): void {
        this.authStore.dispatch(loginAction({ data: loginData }))
    }

    logout(): void {
        this.authStore.dispatch(logoutAction())
    }
}
