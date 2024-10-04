import {AuthState} from '../models/login.model'

type AuthSelectorData = {
    auth: AuthState
}
export const authErrorSelector = ({ auth }: AuthSelectorData) => auth.error
export const authIdSelector = (state: AuthSelectorData) => state.auth.token?.user.id
export const authTokenSelector = (state: AuthSelectorData) => state.auth.token?.accessToken
export const getCurrentUser = (state: AuthSelectorData) => state.auth.token?.user ?? null
