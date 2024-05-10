import { takeEvery, put, call } from 'redux-saga/effects';
import { getLoginApi} from '../../services/user';
import {
    getLoginAction,
    getLoginFailureAction,
    getLoginSuccessAction
} from '../../store/user/userReducer'

// loginSaga
function* getLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '',  }
}): any {
    try {
        const response = yield call<any>(getLoginApi, action.payload);
        if (response.status === 'ok') {
            yield put(getLoginSuccessAction(response.user))
            localStorage.setItem("userData", JSON.stringify(response.user));
            console.log('login success')
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