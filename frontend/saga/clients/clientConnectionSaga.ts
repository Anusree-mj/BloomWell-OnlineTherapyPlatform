import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getConnectionsAction,
    getConnectionsFailureAction,
    getConnectionsSuccessAction
} from '@/store/clients/clientConnectionReducer';

import { apiCall } from '@/services/api';


// get connections saga
function* getConnectionsActionSaga(action: {
    type: string;
    payload: {
        clientId: ''
    }
}): any {
    try {
        console.log('data recieved in saga', action.payload)
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/connection/${action.payload}`,
        });

        if (response.status === 'ok') {
            yield put(getConnectionsSuccessAction(response.therapists))
        } else {
            yield put(getConnectionsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getConnectionsFailureAction(err))
    }
}

export function* clientConnectionWatcher() {
    yield takeEvery(getConnectionsAction, getConnectionsActionSaga);
}