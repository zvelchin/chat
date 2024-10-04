import {FormControl} from '@angular/forms'
import { UserData } from '../../user/models/user.model'

export type LoginFormGroup = {
    username: FormControl
    password: FormControl
}

export type LoginFormData = {
    username: string
    password: string
}

export type TokenData = {
    accessToken: string
    user: UserData
}

export type AuthError = {
    error?: string
    message?: string
}

export type AuthState = {
    token?: TokenData
    error?: string
}
