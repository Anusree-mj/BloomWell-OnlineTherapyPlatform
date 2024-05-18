import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAdminLoginAction,
    getAdminLoginSuccessAction,
    getAdminLoginFailureAction,
    getClientsDetailsAction,
    getClientsDetailsFailureAction,
    getClientsDetailsSuccessAction,
    getTherapistsDetailsAction,
    getTherapistsDetailsFailureAction,
    getTherapistsDetailsSuccessAction
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
            yield put(getAdminLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getAdminLoginFailureAction(err))
    }
}

// get Clients details
function* getClientsDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/clients/view',
        });

        if (response.status === 'ok') {
            yield put(getClientsDetailsSuccessAction(response.clients))
            console.log('cleint details', response.clients)
        } else {
            yield put(getClientsDetailsFailureAction(response.message))

        }
    } catch (err) {
        yield put(getClientsDetailsFailureAction(err))
    }
}

// get therapists details
function* getTherapistsDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/therapists/view',
        });

        if (response.status === 'ok') {
            console.log(response, 'response got in sage')
            yield put(getTherapistsDetailsSuccessAction(response.therapists))
        } else {
            yield put(getTherapistsDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistsDetailsFailureAction(err))
    }
}


export function* adminWatcher() {
    yield takeEvery(getAdminLoginAction, getAdminLoginActionSaga);
    yield takeEvery(getClientsDetailsAction, getClientsDetailsActionSaga);
    yield takeEvery(getTherapistsDetailsAction, getTherapistsDetailsActionSaga);

}