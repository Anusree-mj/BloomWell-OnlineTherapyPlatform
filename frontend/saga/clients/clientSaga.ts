import { takeEvery, put, call } from 'redux-saga/effects';
import { getSignupApi } from '@/services/clients/auth';
import {
    getSignUpAction,
    getSignUpFailureAction,
    getSignUpSuccessAction
} from '@/store/clients/clientReducer';
import Router from 'next/router';


// SignupSaga
function* getSignUpActionSaga(action: {
    type: string;
    payload: { type: '', otp: number, name: '', email: '', password: '', questionnaire: [] }
}): any {
    try {
        const response = yield call<any>(getSignupApi, action.payload);
        if (response.status === 'ok') {
            yield put(getSignUpSuccessAction(response.client))
            localStorage.setItem("clientData", JSON.stringify(response.client));
            console.log('signup success')
            yield call(() => Router.push('/'));
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