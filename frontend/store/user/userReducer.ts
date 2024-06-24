import { createSlice } from "@reduxjs/toolkit";

import { UserItem, NotificationItem, ChatItem } from './type'

export interface userStateType {
    user: UserItem;
    chats: ChatItem[];
    notifications: NotificationItem[];
    isLoading: boolean;
    error: any;
}

const initialState: userStateType = {
    user: {
        name: '',
        email: '',
        _id: ""
    },
    isLoading: false,
    error: null,
    notifications: [],
    chats: []
}

export const userSlice: any = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // login action
        getLoginAction: (state) => {
            console.log('entered in login action')
            state.isLoading = true;
        },
        getLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        getLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        getNotificationsAction: (state) => {
            console.log('entered in login action')
            state.isLoading = true;
        },
        getNotificationsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.notifications = action.payload;
        },
        getNotificationsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

        // get chats
        getChatAction: (state) => {
            console.log('entered in login action')
            state.isLoading = true;
        },
        getChatSuccessAction: (state, action) => {
            state.isLoading = false;
            state.chats = action.payload;
        },
        getChatFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
    }
})
export const {
    getLoginAction,
    getLoginSuccessAction,
    getLoginFailureAction,
    getNotificationsAction,
    getNotificationsFailureAction,
    getNotificationsSuccessAction,
    getChatAction,
    getChatFailureAction,
    getChatSuccessAction
} = userSlice.actions;