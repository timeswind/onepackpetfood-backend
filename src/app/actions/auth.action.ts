// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { AuthData } from './../models/auth_data.model'

// Section 2
export enum AuthActionTypes {
    USER_LOGIN = '[AUTH] USER_LOGIN',
    USER_LOGOUT = '[AUTH] USER_LOGOUT'
}

// Section 3
export class UserLogin implements Action {
    readonly type = AuthActionTypes.USER_LOGIN

    constructor(public payload: AuthData) { }
}

export class UserLogout implements Action {
    readonly type = AuthActionTypes.USER_LOGOUT

    constructor() { }
}

// Section 4
export type Actions = UserLogin | UserLogout