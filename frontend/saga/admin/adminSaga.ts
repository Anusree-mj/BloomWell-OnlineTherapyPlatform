import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAllClientsDetailsAction,
    getAllClientsDetailsFailureAction,
    getAllClientsDetailsSuccessAction,
    getTherapistsDetailsAction,
    getTherapistsDetailsFailureAction,
    getTherapistsDetailsSuccessAction,
    getSingleClientsDetailsAction,
    getSingleClientsDetailsFailureAction,
    getSingleClientsDetailsSuccessAction,
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
            console.log('cleint details', response.clients)
        } else {
            yield put(getAllClientsDetailsFailureAction(response.message))

        }
    } catch (err) {
        yield put(getAllClientsDetailsFailureAction(err))
    }
}
// get single client
function* getSingleClientsDetailsActionSaga(action: {
    type: string;
    payload: { clientId: '' }
}): any {
    try {
        console.log('actionpayload', action.payload)
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `admin/clients/view/${action.payload.clientId}`,
        });
        if (response.status === 'ok') {
            yield put(getSingleClientsDetailsSuccessAction(response.client))
        } else {
            yield put(getSingleClientsDetailsFailureAction(response.message))

        }
    } catch (err) {
        yield put(getSingleClientsDetailsFailureAction(err))
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
    yield takeEvery(getAllClientsDetailsAction, getAllClientsDetailsActionSaga);
    yield takeEvery(getTherapistsDetailsAction, getTherapistsDetailsActionSaga);
    yield takeEvery(getSingleClientsDetailsAction, getSingleClientsDetailsActionSaga);

}