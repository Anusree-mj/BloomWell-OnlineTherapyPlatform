import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAllClientsDetailsAction,
    getAllClientsDetailsFailureAction,
    getAllClientsDetailsSuccessAction,
    getTherapistsDetailsAction,
    getTherapistsDetailsFailureAction,
    getTherapistsDetailsSuccessAction,

} from '@/store/admin/adminReducer';
import { apiCall } from '@/services/api';

// get Clients details
function* getAllClientsDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/clients/view',
        });

        if (response.status === 'ok') {
            yield put(getAllClientsDetailsSuccessAction(response.clients))
        } else {
            yield put(getAllClientsDetailsFailureAction(response.message))

        }
    } catch (err) {
        yield put(getAllClientsDetailsFailureAction(err))
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
            yield put(getTherapistsDetailsSuccessAction(response.therapists))
        } else {
            yield put(getTherapistsDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistsDetailsFailureAction(err))
    }
}


export function* adminWatcher() {
    yield takeEvery(getAllClientsDetailsAction, getAllClientsDetailsActionSaga);
    yield takeEvery(getTherapistsDetailsAction, getTherapistsDetailsActionSaga);

}