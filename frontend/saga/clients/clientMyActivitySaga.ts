import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getClientOngoingActivityAction,
    getClientOngoingActivityFailureAction,
    getClientOngoingActivitySuccessAction,
    getAvailableSlotsAction,
    getAvailableSlotsFailureAction,
    getAvailableSlotsSuccessAction

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

// get available slots
function* getAvailableSlotsActionSaga(action: {
    type: string;
    payload: {
        therapistId: ''
    }
}): any {
    try {
        console.log('data recieved in saga', action.payload)
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/slots/${action.payload}`,
        });
        if (response.status === 'ok') {
            console.log('slots got in slots saga', response.slots)
            yield put(getAvailableSlotsSuccessAction(response.slots))
        } else {
            yield put(getAvailableSlotsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getAvailableSlotsFailureAction(err))
    }
}



export function* clientMyActionWatcher() {
    yield takeEvery(getClientOngoingActivityAction, getClientOngoingActivityActionSaga);
    yield takeEvery(getAvailableSlotsAction, getAvailableSlotsActionSaga);

}