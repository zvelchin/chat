import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { EMPTY, exhaustMap, map, withLatestFrom } from 'rxjs'
import { AuthState } from '../../auth/models/login.model'
import { authIdSelector, getCurrentUser } from '../../auth/store/auth.selectors'
import { UserData, UserState } from '../models/user.model'
import { UserApiService } from '../services/user-api.service'
import {
    loadUserDataById,
    saveUserAction, saveUserDataById,
    updateOnlineAction,
    updateOnlineAndLoadUserAction,
    updateUserDataAction
} from './user.actions'

@Injectable()
export class UserEffects {
    loadAuthUserData$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(updateOnlineAndLoadUserAction),
                withLatestFrom(
                    this.store.select(getCurrentUser),
                ),
                exhaustMap(([_, currentUserData]: [Action, UserData | null]) => {
                    if (!currentUserData?.id) {
                        throw new Error('User not found')
                    }
                    return this.userApiService.updateOnlineStateRequest(currentUserData.id, true)
                        .pipe(
                            map((userData: UserData) =>
                                saveUserAction({ data: userData })
                            )
                        )
                }),
            )
    )

    updateOnline$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOnlineAction),
            withLatestFrom(this.store.select(authIdSelector)),
            exhaustMap(([{ isOnline }, id]: [{ isOnline: boolean }, string | undefined]) => {
                if (!id) {
                    throw new Error('User id not found')
                }

                return this.userApiService.updateOnlineStateRequest(id, isOnline)
                    .pipe(
                        map((updatedData: UserData) => updateUserDataAction({ data: updatedData }))
                    )
            })
        )
    )

    loadUserDataById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUserDataById),
            exhaustMap(({ id }) => {
                return this.userApiService.getUsersDataRequest([id])
                    .pipe(
                        map((usersData: UserData[]) => {
                            if (!usersData.length) {
                                console.error('User not found')
                            }
                            return usersData.length ? usersData[0] : { id: '', username: 'Unknown user', is_online: false }
                        }),
                        map((userData: UserData) => {
                            return saveUserDataById({ data: userData })
                        })
                    )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private userApiService: UserApiService,
        private store: Store<{ auth: AuthState }>
    ) {
    }
}
