import { takeEvery, put, call } from 'redux-saga/effects';
import { getLoginApi } from '../../services/user';
import {
    getLoginAction,
    getLoginFailureAction,
    getLoginSuccessAction
} from '../../store/user/userReducer'

// loginSaga
function* getLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '', }
}): any {
    try {
        const response = yield call<any>(getLoginApi, action.payload);
        if (response.status === 'ok') {
            if (response.role === 'client') {
                yield put(getLoginSuccessAction(response.client))
                localStorage.setItem("clientData", JSON.stringify(response.client));
                console.log('login success')
            } else {
                yield put(getLoginSuccessAction(response.therapist))
                localStorage.setItem("therapistData", JSON.stringify(response.therapist));
                console.log('login success')
            }
        } else {
            yield put(getLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getLoginFailureAction(err))
    }
}

export function* userWatcher() {
    yield takeEvery(getLoginAction, getLoginActionSaga);
}