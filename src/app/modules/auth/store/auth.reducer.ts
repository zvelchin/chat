import {AuthState} from '../models/login.model'
import {createReducer, on} from '@ngrx/store'
import {authFailure, authSuccess, resetAuthState} from './auth.actions'

const initialState: AuthState = {}

export const authReducer = createReducer(
    initialState,
    on(authSuccess, (_, { token }) => ({ token })),
    on(authFailure, (state, { error }) => {
        console.log(error)
        state = { error: error.error ?? error.message ?? 'Login failed' }
        return state
    }),
    on(resetAuthState, (state) => {
        state = {}
        return state
    })
)
