import { createSlice } from "@reduxjs/toolkit";

import { UserItem, NotificationItem, ChatItem } from './type'

export interface userStateType {
    user: UserItem;
    notificationCount: Number;
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
    notificationCount: 0,
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
            state.isLoading = true;
        },
        getLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        getLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        getNotificationsAction: (state) => {
            state.isLoading = true;
        },
        getNotificationsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.notifications = action.payload;
            console.log('notificationss:',state.notifications)
        },
        getNotificationsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // get chats
        getChatAction: (state) => {
            state.isLoading = true;
        },
        getChatSuccessAction: (state, action) => {
            state.isLoading = false;
            state.chats = action.payload;
        },
        getChatFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        getNotificationCountAction: (state) => {
            state.isLoading = true;
        },
        getNotificationCountSuccessAction: (state, action) => {
            state.isLoading = false;
            state.notificationCount = action.payload;
            console.log('count got::', state.notificationCount)
        },
        getNotificationCountFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
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
    getChatSuccessAction,
    getNotificationCountAction,
    getNotificationCountSuccessAction,
    getNotificationCountFailureAction,

} = userSlice.actions;