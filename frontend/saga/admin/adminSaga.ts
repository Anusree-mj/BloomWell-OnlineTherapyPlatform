import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getClientsDetailsAction,
    getClientsDetailsFailureAction,
    getClientsDetailsSuccessAction,
    getTherapistsDetailsAction,
    getTherapistsDetailsFailureAction,
    getTherapistsDetailsSuccessAction
} from '@/store/admin/adminReducer';
import { apiCall } from '@/services/api';

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
    yield takeEvery(getClientsDetailsAction, getClientsDetailsActionSaga);
    yield takeEvery(getTherapistsDetailsAction, getTherapistsDetailsActionSaga);

}