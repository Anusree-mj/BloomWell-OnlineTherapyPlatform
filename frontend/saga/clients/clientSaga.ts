import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getClientSignUpAction,
    getClientSignUpFailureAction,
    getClientSignUpSuccessAction,
    saveClientDetailsAction,
    saveClientDetailsFailureAction,
    saveClientDetailsSuccessAction,
    getClientDetailsAction,
    getClientDetailsFailureAction,
    getClientDetailsSuccessAction,
    getSignInWithGoogleAction,
    getAnyClientDetailsAction,
    getAnyClientDetailsFailureAction,
    getAnyClientDetailsSuccessAction

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
        console.log('data recieved in saga', action.payload)
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

// get clientDetailsSaga
function* getClientDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/details`,
        });
        if (response.status === 'ok') {
            yield put(getClientDetailsSuccessAction(response.client))
            console.log('clientdetails getting in saga', response.client)
            localStorage.setItem("clientData", JSON.stringify(response.client));
        } else {
            yield put(getClientDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getClientDetailsFailureAction(err))
    }
}

// save clientsDetailsSaga(googleauth)
function* getSignInWithGoogleActionSaga(action: {
    type: string;
    payload: {
        profile: {}, handleSigninWithGoogleSuccess: () => void
    }
}): any {
    try {
        console.log('data recieved in auth saga', action.payload)
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'client/googleAuth',
            body: action.payload
        });
        if (response.status === 'ok') {
            yield put(saveClientDetailsSuccessAction(response.client))
            localStorage.setItem("clientData", JSON.stringify(response.client));
            action.payload.handleSigninWithGoogleSuccess()
        } else {
            yield put(saveClientDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(saveClientDetailsFailureAction(err))
    }
}

// get clietn details
function* getAnyClientDetailsActionSaga(action: {
    type: string;
    payload: { clientId: '' }
}): any {
    try {
        console.log('clientid got in saga', action.payload)
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/viewAny/${action.payload.clientId}`,
        });

        if (response.status === 'ok') {
            yield put(getAnyClientDetailsSuccessAction(response.client))
            console.log('connection details', response.client)
        } else {
            yield put(getAnyClientDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getAnyClientDetailsFailureAction(err))
    }
}

export function* clientAuthWatcher() {
    yield takeEvery(getClientSignUpAction, getClientSignUpActionSaga);
    yield takeEvery(saveClientDetailsAction, saveclientDetailsActionSaga);
    yield takeEvery(getClientDetailsAction, getClientDetailsActionSaga);
    yield takeEvery(getSignInWithGoogleAction, getSignInWithGoogleActionSaga);
    yield takeEvery(getAnyClientDetailsAction, getAnyClientDetailsActionSaga);

}