import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAdminConnectionRequestAction,
    getAdminConnectionRequestFailureAction,
    getAdminConnectionRequestSuccessAction
} from '@/store/admin/adminConnectionReducer';
import { apiCall } from '@/services/api';

// get Clients details
function* getAdminConnectionRequestActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/connections',
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


export function* adminTherapistManageWatcher() {
    yield takeEvery(getAdminConnectionRequestAction, getAdminConnectionRequestActionSaga);

}