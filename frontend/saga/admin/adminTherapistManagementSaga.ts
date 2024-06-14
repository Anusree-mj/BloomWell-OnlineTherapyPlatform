import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAdminConnectionRequestAction,
    getAdminConnectionRequestFailureAction,
    getAdminConnectionRequestSuccessAction,
} from '@/store/admin/adminConnectionReducer';
import {
    getRejectedTherapistsDetailsAction,
    getRejectedTherapistsDetailsSuccessAction,
    getRejectedTherapistsDetailsFailureAction,
    getTherapistsWhoQuitAction,
    getTherapistsWhoQuitFailureAction,
    getTherapistsWhoQuitSuccessAction
} from '@/store/admin/adminReducer';
import { apiCall } from '@/services/api';

// get connection details
function* getAdminConnectionRequestActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/therapists/connections',
        });

        if (response.status === 'ok') {
            yield put(getAdminConnectionRequestSuccessAction(response.connections))
            console.log('connection details', response.connections)
        } else {
            yield put(getAdminConnectionRequestFailureAction(response.message))

        }
    } catch (err) {
        yield put(getAdminConnectionRequestFailureAction(err))
    }
}

// get rejected therapists details
function* getRejectedTherapistsDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/therapists/rejected',
        });
        if (response.status === 'ok') {
            yield put(getRejectedTherapistsDetailsSuccessAction(response.therapists))
        } else {
            yield put(getRejectedTherapistsDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getRejectedTherapistsDetailsFailureAction(err))
    }
}

// get  therapists details
function* getTherapistsWhoQuitActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/therapists/quit',
        });

        if (response.status === 'ok') {
            yield put(getTherapistsWhoQuitSuccessAction(response.therapists))
        } else {
            yield put(getTherapistsWhoQuitFailureAction(response.message))

        }
    } catch (err) {
        yield put(getTherapistsWhoQuitFailureAction(err))
    }
}


export function* adminTherapistManageWatcher() {
    yield takeEvery(getAdminConnectionRequestAction, getAdminConnectionRequestActionSaga);
    yield takeEvery(getRejectedTherapistsDetailsAction, getRejectedTherapistsDetailsActionSaga);
    yield takeEvery(getTherapistsWhoQuitAction, getTherapistsWhoQuitActionSaga);


}