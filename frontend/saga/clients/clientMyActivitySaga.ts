import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getClientOngoingActivityAction, getClientOngoingActivityFailureAction, getClientOngoingActivitySuccessAction,
    getAvailableSlotsAction, getAvailableSlotsFailureAction, getAvailableSlotsSuccessAction,
    getBookedSlotsDetailsAction, getBookedSlotsDetailsFailureAction, getBookedSlotsDetailsSuccessAction,
    getClientsAllConnectionAction, getClientsAllConnectionSuccessAction, getClientsAllConnectionFailureAction

} from '@/store/clients/clientMyActionReducer';
import { apiCall } from '@/services/api';
import { getAllClientsDetailsAction } from '@/store/admin/adminReducer';


// get connections saga
function* getClientOngoingActivityActionSaga(action: {
    type: string;
    payload: {
        therapistId: ''
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/ongoing/${action.payload.therapistId}`,
        });
        if (response.status === 'ok') {
            yield put(getClientOngoingActivitySuccessAction(response.ongoingActivities))
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
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/slots/${action.payload}`,
        });
        if (response.status === 'ok') {
            yield put(getAvailableSlotsSuccessAction(
                {
                    slots: response.slots,
                    availableFrom: response.availableFrom,
                    availableTo: response.availableTo
                }))
        } else {
            yield put(getAvailableSlotsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getAvailableSlotsFailureAction(err))
    }
}

// get booked slot
function* getBookedSlotsDetailsActionSaga(action: {
    type: string;
    payload: {
        activeSlotId: ''
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/slots/active/${action.payload}`,
        });
        if (response.status === 'ok') {
            yield put(getBookedSlotsDetailsSuccessAction(response.slotDetails))
        } else {
            yield put(getBookedSlotsDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getBookedSlotsDetailsFailureAction(err))
    }
}

// get booked slot
function* getClientsAllConnectionActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `client/activity/all`,
        });
        if (response.status === 'ok') {
            yield put(getClientsAllConnectionSuccessAction(response.activities))
        } else {
            yield put(getClientsAllConnectionFailureAction(response.message))
        }
    } catch (err) {
        yield put(getClientsAllConnectionFailureAction(err))
    }
}


export function* clientMyActionWatcher() {
    yield takeEvery(getClientOngoingActivityAction, getClientOngoingActivityActionSaga);
    yield takeEvery(getAvailableSlotsAction, getAvailableSlotsActionSaga);
    yield takeEvery(getBookedSlotsDetailsAction, getBookedSlotsDetailsActionSaga);
    yield takeEvery(getClientsAllConnectionAction, getClientsAllConnectionActionSaga);

}