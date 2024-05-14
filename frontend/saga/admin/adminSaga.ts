import { takeEvery, put, call } from 'redux-saga/effects';
import { getAdminLoginApi } from '@/services/admin/adminAuth';
import {
    getAdminLoginAction,
    getAdminLoginSuccessAction,
    getAdminLoginFailureAction
} from '@/store/admin/adminReducer';


// adminLoginSaga
function* getAdminLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '', handleAdminLoginSuccess: () => void }
}): any {
    try {
        const response = yield call<any>(getAdminLoginApi, action.payload);
        if (response.status === 'ok') {
            yield put(getAdminLoginSuccessAction(response.admin))
            localStorage.setItem("adminData", JSON.stringify(response.admin));
            action.payload.handleAdminLoginSuccess()
            console.log('login success')
        } else {
            yield put(getAdminLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getAdminLoginFailureAction(err))
    }
}
export function* adminWatcher() {
    yield takeEvery(getAdminLoginAction, getAdminLoginActionSaga);
}