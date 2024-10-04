import { createSelector } from '@ngrx/store'
import { UserSelectorState, UserState } from '../models/user.model'

export const selectUserState = (state: UserSelectorState) => state.user

export const getUserInfoById = (id: string) => createSelector(
    selectUserState,
    (user: UserState) => {
        return user.usersInfo?.[id]
    }
)
