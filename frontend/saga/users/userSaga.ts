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
    payload: { email: '', password: '', handleLoginSuccess: (role: string) => void }
}): any {
    try {
        const response = yield call<any>(getLoginApi, action.payload);
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

export function* userWatcher() {
    yield takeEvery(getLoginAction, getLoginActionSaga);
}