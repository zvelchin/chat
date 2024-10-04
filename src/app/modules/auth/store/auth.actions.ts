import {createAction, props} from '@ngrx/store'
import {AuthError, LoginFormData, TokenData} from '../models/login.model'

enum AuthActionsTypes {
    login = 'LOGIN',
    authSuccess = 'AUTH_SUCCESS',
    authFailure = 'AUTH_FAILURE',
    resetState = 'RESET_STATE',
    logout = 'LOGOUT'
}

export const loginAction = createAction(AuthActionsTypes.login, props<{ data: LoginFormData }>())

export const authSuccess = createAction(AuthActionsTypes.authSuccess, props<{ token: TokenData }>())

export const authFailure = createAction(AuthActionsTypes.authFailure, props<{ error: AuthError }>())

export const resetAuthState = createAction(AuthActionsTypes.resetState)

export const logoutAction = createAction(AuthActionsTypes.logout)

