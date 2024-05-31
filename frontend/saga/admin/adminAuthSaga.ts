import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAdminLoginAction,
    getAdminLoginSuccessAction,
    getAdminLoginFailureAction,
} from '@/store/admin/adminReducer';
import { apiCall } from '@/services/api';


// adminLoginSaga
function* getAdminLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '', handleAdminLoginSuccess: () => void }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'admin/login',
            body: action.payload
        });

        if (response.status === 'ok') {
            yield put(getAdminLoginSuccessAction(response.admin))
            localStorage.setItem("adminData", JSON.stringify(response.admin));
            action.payload.handleAdminLoginSuccess()
            console.log('login success')
        } else {
            console.log('login not success')
            yield put(getAdminLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getAdminLoginFailureAction(err))
    }
}

export function* adminAuthWatcher() {
    yield takeEvery(getAdminLoginAction, getAdminLoginActionSaga);
}