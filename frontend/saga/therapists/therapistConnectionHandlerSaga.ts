import { takeEvery, put, call } from 'redux-saga/effects';
import { apiCall } from '@/services/api';
import {
    getTherapistsConnectionRequestAction,
    getTherapistsConnectionRequestFailureAction,
    getTherapistsConnectionRequestSuccessAction,
    getTherapistsRejectedConnectionsAction,
    getTherapistsRejectedConnectionsFailureAction,
    getTherapistsRejectedConnectionsSuccessAction,
    getTherapistsActiveConnectionsAction,
    getTherapistsActiveConnectionsFailureAction,
    getTherapistsActiveConnectionsSuccessAction
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

// get ongoing active connections
function* getTherapistsActiveConnectionsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/connections/active',
        });

        if (response.status === 'ok') {
            yield put(getTherapistsActiveConnectionsSuccessAction(response.connections))
            console.log('connection details', response.connections)
        } else {
            yield put(getTherapistsActiveConnectionsFailureAction(response.message))

        }
    } catch (err) {
        yield put(getTherapistsActiveConnectionsFailureAction(err))
    }
}

export function* therapistConnectionRequestWatcher() {
    yield takeEvery(getTherapistsConnectionRequestAction, getTherapistsConnectionRequestActionSaga);
    yield takeEvery(getTherapistsRejectedConnectionsAction, getTherapistsRejectedConnectionsActionSaga);
    yield takeEvery(getTherapistsActiveConnectionsAction, getTherapistsActiveConnectionsActionSaga);

}