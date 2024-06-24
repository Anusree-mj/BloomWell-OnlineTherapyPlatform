import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getClientOngoingActivityAction,
    getClientOngoingActivityFailureAction,
    getClientOngoingActivitySuccessAction

} from '@/store/clients/clientMyActionReducer';
import { apiCall } from '@/services/api';


// get connections saga
function* getClientOngoingActivityActionSaga(action: {
    type: string;
    payload: {
        clientId: ''
    }
}): any {
    try {
        console.log('data recieved in saga', action.payload)
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/myActivity/ongoing`,
        });
        console.log('reaponse got in ongoing saga', response)
        if (response.status === 'ok') {
            yield put(getClientOngoingActivitySuccessAction(response.connectionDetails))
        } else {
            yield put(getClientOngoingActivityFailureAction(response.message))
        }
    } catch (err) {
        yield put(getClientOngoingActivityFailureAction(err))
    }
}



export function* clientMyActionWatcher() {
    yield takeEvery(getClientOngoingActivityAction, getClientOngoingActivityActionSaga);
}