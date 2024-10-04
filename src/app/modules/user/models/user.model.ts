export type UserSelectorState = {
    user: UserState
}

export type UsersInfo = { [key: string]: UserData }

export type UserState = {
    currentUser?: UserData
    usersInfo?: UsersInfo
}

export type UserData = {
    id: string
    username: string
    is_online: boolean,
    password?: string,
}
