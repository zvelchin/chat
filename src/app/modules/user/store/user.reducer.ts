import { createReducer, on } from '@ngrx/store'
import { UserData, UsersInfo, UserState } from '../models/user.model'
import { saveUserAction, saveUsersData, updateUserDataAction } from './user.actions'

const initialState: UserState = {}

export const userReducer = createReducer(
    initialState,
    on(saveUserAction, (state, { data }) => {
        return { ...state, currentUser: data }
    }),
    on(updateUserDataAction, (state, { data }) => {
        const currentUser: UserData = state.currentUser as UserData
        return { ...state, currentUser: { ...currentUser, ...data } }
    }),
    on(saveUsersData, (state, { data }) => {
        const usersInfo = state.usersInfo ?? {}
        const newUserInfo: UsersInfo = {}
        data.forEach((user: UserData) => {
            newUserInfo[user.id] = user
        })
        return { ...state, usersInfo: { ...usersInfo, ...newUserInfo } }
    })
)
