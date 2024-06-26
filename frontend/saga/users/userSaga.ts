import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getLoginAction,
    getLoginFailureAction,
    getLoginSuccessAction,
    getNotificationsAction,
    getNotificationsFailureAction,
    getNotificationsSuccessAction,
    getChatAction,
    getChatFailureAction,
    getChatSuccessAction
} from '../../store/user/userReducer'
import { apiCall } from '@/services/api';

// loginSaga
function* getLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '', handleLoginSuccess: (role: string) => void }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'users/login',
            body: action.payload
        });

        if (response.status === 'ok') {
            if (response.role === 'client') {
                yield put(getLoginSuccessAction(response.client))
                localStorage.setItem("clientData", JSON.stringify(response.client));
                action.payload.handleLoginSuccess(response.role)
                console.log('login success')
            } else {
                console.log('therapist role entered')
                yield put(getLoginSuccessAction(response.therapist))
                localStorage.setItem("therapistData", JSON.stringify(response.therapist));
                action.payload.handleLoginSuccess(response.role)
                console.log('login success')
            }
        } else {
            yield put(getLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getLoginFailureAction(err))
    }
}

// get notifications
function* getNotificationsActionSaga(action: {
    type: string;
    payload: { userId: '' }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `users/notifications/${action.payload}`,
        });

        if (response.status === 'ok') {
            yield put(getNotificationsSuccessAction(response.notifications))
        } else {
            yield put(getNotificationsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getNotificationsFailureAction(err))
    }
}

// get chat
function* getChatActionSaga(action: {
    type: string;
    payload: { recieverId: string; senderId: string }
}): any {
    try {
        console.log('data in getChat saga payload receiverId', action.payload.recieverId);
        console.log('data in getChat saga payload senderId', action.payload.senderId);

        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `users/chat/${action.payload.senderId}/${action.payload.recieverId}`,
        });

        if (response.status === 'ok') {
            yield put(getChatSuccessAction(response.chats));
        } else {
            yield put(getChatFailureAction(response.message));
        }
    } catch (err) {
        yield put(getChatFailureAction(err));
    }
}



export function* userWatcher() {
    yield takeEvery(getLoginAction, getLoginActionSaga);
    yield takeEvery(getNotificationsAction, getNotificationsActionSaga);
    yield takeEvery(getChatAction, getChatActionSaga);

}