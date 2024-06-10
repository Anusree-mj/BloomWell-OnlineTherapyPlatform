import { takeEvery, put, call } from 'redux-saga/effects';
import { apiCall } from '@/services/api';
import {
    getTherapistsConnectionRequestAction,
    getTherapistsConnectionRequestFailureAction,
    getTherapistsConnectionRequestSuccessAction,
    getTherapistsRejectedConnectionsAction,
    getTherapistsRejectedConnectionsFailureAction,
    getTherapistsRejectedConnectionsSuccessAction,

} from '@/store/therapists/therapistConnectionHandlerReducers';

// therapist connection request saga
function* getTherapistsConnectionRequestActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/connections',
        });

        if (response.status === 'ok') {
            yield put(getTherapistsConnectionRequestSuccessAction(response.connections))
            console.log('connection details', response.connections)
        } else {
            yield put(getTherapistsConnectionRequestFailureAction(response.message))

        }
    } catch (err) {
        yield put(getTherapistsConnectionRequestFailureAction(err))
    }
}

// therapist rejected connection request saga
function* getTherapistsRejectedConnectionsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/rejected/connections',
        });

        if (response.status === 'ok') {
            yield put(getTherapistsRejectedConnectionsSuccessAction(response.connections))
            console.log('connection details', response.connections)
        } else {
            yield put(getTherapistsRejectedConnectionsFailureAction(response.message))

        }
    } catch (err) {
        yield put(getTherapistsRejectedConnectionsFailureAction(err))
    }
}

export function* therapistConnectionRequestWatcher() {
    yield takeEvery(getTherapistsConnectionRequestAction, getTherapistsConnectionRequestActionSaga);
    yield takeEvery(getTherapistsRejectedConnectionsAction, getTherapistsRejectedConnectionsActionSaga);

}