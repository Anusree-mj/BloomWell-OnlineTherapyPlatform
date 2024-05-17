import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAdminLoginApi,
    getClientssDetailsApi,
    getTherapistsDetailsApi,
}
    from '@/services/admin/adminAuth';
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

// get Clients details
function* getClientsDetailsActionSaga(): any {
    try {
        const response = yield call<any>(getClientssDetailsApi);
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
        const response = yield call<any>(getTherapistsDetailsApi);
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


export function* adminWatcher() {
    yield takeEvery(getAdminLoginAction, getAdminLoginActionSaga);
    yield takeEvery(getClientsDetailsAction, getClientsDetailsActionSaga);
    yield takeEvery(getTherapistsDetailsAction, getTherapistsDetailsActionSaga);

}