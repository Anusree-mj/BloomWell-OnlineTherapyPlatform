import { takeEvery, put, call } from 'redux-saga/effects';
import { getSignupApi } from '@/services/clients/auth';
import {
    getSignUpAction,
    getSignUpFailureAction,
    getSignUpSuccessAction
} from '@/store/clients/clientReducer';


// SignupSaga
function* getSignUpActionSaga(action: {
    type: string;
    payload: { otp: number, name: '', email: '', password: '', handleSignupSuccess: () => void }
}): any {
    try {
        const response = yield call<any>(getSignupApi, action.payload);
        if (response.status === 'ok') {
            yield put(getSignUpSuccessAction(response.client))
            localStorage.setItem("clientData", JSON.stringify(response.client));
            action.payload.handleSignupSuccess()
            console.log('signup success')
        } else {
            yield put(getSignUpFailureAction(response.message))
        }
    } catch (err) {
        yield put(getSignUpFailureAction(err))
    }
}

export function* clientWatcher() {
    yield takeEvery(getSignUpAction, getSignUpActionSaga);
}