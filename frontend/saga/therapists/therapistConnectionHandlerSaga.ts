import { takeEvery, put, call } from 'redux-saga/effects';
import { apiCall } from '@/services/api';
import {
    getTherapistsConnectionRequestAction,
    getTherapistsConnectionRequestFailureAction,
    getTherapistsConnectionRequestSuccessAction
} from '@/store/therapists/therapistConnectionHandlerReducers';

// therapist connection request saga
function* getTherapistsConnectionRequestActionSaga(action: {
    type: string;
    payload: {
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'get',
            endpoint: 'therapist/connections',
        });
        if (response.status === 'ok') {
            yield put(getTherapistsConnectionRequestSuccessAction(response.connections))
            console.log('Connections got',response.connections)
        } else {
            yield put(getTherapistsConnectionRequestFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistsConnectionRequestFailureAction(err))
    }
}

export function* therapistConnectionRequestWatcher() {
    yield takeEvery(getTherapistsConnectionRequestAction, getTherapistsConnectionRequestActionSaga);
}