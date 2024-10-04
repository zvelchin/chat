import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  EMPTY,
  exhaustMap,
  map,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  LocalStorageKeyItem,
  LocalStorageService,
} from '../../../core/services/local-storage.service';
import { UserApiService } from '../../user/services/user-api.service';
import {
  AuthError,
  AuthState,
  LoginFormData,
  TokenData,
} from '../models/login.model';
import { AuthApiService } from '../services/auth-api.service';
import {
  authFailure,
  authSuccess,
  loginAction,
  logoutAction,
  resetAuthState,
} from './auth.actions';
import { authIdSelector } from './auth.selectors';

@Injectable()
export class AuthEffects {
  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      exhaustMap(({ data }: { data: LoginFormData }) =>
        this.loginService.loginRequest(data).pipe(
          tap((tokenData: TokenData) => {
            this.localStorageService.setItem(
              LocalStorageKeyItem.auth,
              tokenData
            );
          }),
          map((tokenData: TokenData) => authSuccess({ token: tokenData })),
          tap(() => {
            this.router.navigate(['/main']);
          }),
          catchError((error: unknown) =>
            of(authFailure({ error: error as AuthError }))
          )
        )
      )
    )
  );

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction),
      withLatestFrom(this.store.select(authIdSelector)),
      exhaustMap(([_, userId]: [Action, string | undefined]) => {
        if (!userId) {
          return EMPTY;
        }
        return this.userApiService.updateOnlineStateRequest(userId, false).pipe(
          map(() => resetAuthState()),
          tap(() => {
            this.localStorageService.setItem(LocalStorageKeyItem.auth, null);
            this.router.navigate(['/login']);
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private loginService: AuthApiService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store<{ auth: AuthState }>,
    private userApiService: UserApiService
  ) {}
}
