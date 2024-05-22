import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getClientSignUpAction,
    getClientSignUpFailureAction,
    getClientSignUpSuccessAction,
    saveClientDetailsAction,
    saveClientDetailsFailureAction,
    saveClientDetailsSuccessAction,

} from '@/store/clients/clientReducer';
import { apiCall } from '@/services/api';

// SignupSaga
function* getClientSignUpActionSaga(action: {
    type: string;
    payload: { otp: number, name: '', email: '', password: '', handleSignupSuccess: () => void }
}): any {
    try {

        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'client/signup',
            body: action.payload
        });

        if (response.status === 'ok') {
            yield put(getClientSignUpSuccessAction(response.client))
            localStorage.setItem("clientData", JSON.stringify(response.client));
            action.payload.handleSignupSuccess()
            console.log('signup success')
        } else {
            yield put(getClientSignUpFailureAction(response.message))
        }
    } catch (err) {
        yield put(getClientSignUpFailureAction(err))
    }
}


// save clientsDetailsSaga
function* saveclientDetailsActionSaga(action: {
    type: string;
    payload: {
        email: '', type: '', age: '', answers: [], handleDetailSubmissionSuccess: () => void
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'client',
            body: action.payload
        });

        if (response.status === 'ok') {
            yield put(saveClientDetailsSuccessAction(response.client))

            localStorage.setItem("clientData", JSON.stringify(response.client));
            action.payload.handleDetailSubmissionSuccess()
        } else {
            yield put(saveClientDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(saveClientDetailsFailureAction(err))
    }
}

export function* clientWatcher() {
    yield takeEvery(getClientSignUpAction, getClientSignUpActionSaga);
    yield takeEvery(saveClientDetailsAction, saveclientDetailsActionSaga);

}