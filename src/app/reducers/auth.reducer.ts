import { Action, createSelector } from '@ngrx/store'
import { AuthData } from './../models/auth_data.model'
import * as AuthActions from '../actions/auth.action';
import { selectAuth } from '../app.state';
// Section 1
const initialState: AuthData = {
    name: "",
    email: "",
    role: 0,
    avatar: "",
    token: "",
    isLogin: false,
    redirectUrl: ""
}

// Section 2
export function reducer(state: AuthData = initialState, action: AuthActions.Actions) {

    // Section 3
    switch (action.type) {
        case AuthActions.AuthActionTypes.USER_LOGIN:
            return action.payload;
        case AuthActions.AuthActionTypes.USER_LOGOUT:
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isFromWxwork');
            localStorage.removeItem('redirectUrl');
            return initialState;
        default:
            return state;
    }
}

export const selectAuthIsLogin = createSelector(
    selectAuth,
    (auth_data: AuthData) => auth_data.isLogin
);

export const selectAuthRole = createSelector(
    selectAuth,
    (auth_data: AuthData) => auth_data.role
);

export const selectAuthName = createSelector(
    selectAuth,
    (auth_data: AuthData) => auth_data.name
);

export const selectAuthAvatar = createSelector(
    selectAuth,
    (auth_data: AuthData) => auth_data.avatar
);

export const selectAuthToken= createSelector(
    selectAuth,
    (auth_data: AuthData) => auth_data.token
);

export const selectAuthRedirectUrl= createSelector(
    selectAuth,
    (auth_data: AuthData) => auth_data.redirectUrl
);