import { takeEvery, put, call } from 'redux-saga/effects';
import { apiCall } from '@/services/api';
import {
    getTherapistsConnectionRequestAction, getTherapistsConnectionRequestFailureAction, getTherapistsConnectionRequestSuccessAction,
    getTherapistsRejectedConnectionsAction, getTherapistsActiveConnectionsAction, getTherapistsInActiveConnectionsAction,
    getTherapistsReviewsAction, getTherapistsReviewsFailureAction, getTherapistsReviewsSuccessAction,
    getTherapistsSchedulesAction, getTherapistsSchedulesFailureAction, getTherapistsSchedulesSuccessAction,
    getTherapistsAllPaymentAction, getTherapistsAllPaymentFailureAction, getTherapistsAllPaymentSuccessAction,
} from '@/store/therapists/therapistActvitiesHandlerReducers';

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
            yield put(getTherapistsConnectionRequestSuccessAction(response.connections))
            console.log('connection details', response.connections)
        } else {
            yield put(getTherapistsConnectionRequestFailureAction(response.message))

        }
    } catch (err) {
        yield put(getTherapistsConnectionRequestFailureAction(err))
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
            yield put(getTherapistsConnectionRequestSuccessAction(response.connections))
            console.log('connection details', response.connections)
        } else {
            yield put(getTherapistsConnectionRequestFailureAction(response.message))

        }
    } catch (err) {
        yield put(getTherapistsConnectionRequestFailureAction(err))
    }
}

// get  inactive connections
function* getTherapistsInActiveConnectionsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/connections/inActive',
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

// get reviews and ratings
function* getTherapistsReviewsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/reviews',
        });

        if (response.status === 'ok') {
            yield put(getTherapistsReviewsSuccessAction(response.reviews))
            console.log('connection details', response.reviews)
        } else {
            yield put(getTherapistsReviewsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistsReviewsFailureAction(err))
    }
}

// get schedules
function* getTherapistsSchedulesActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/schedules',
        });

        if (response.status === 'ok') {
            yield put(getTherapistsSchedulesSuccessAction(response.schedules))
        } else {
            yield put(getTherapistsSchedulesFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistsSchedulesFailureAction(err))
    }
}

// get reviews and ratings
function* getTherapistsAllPaymentActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/payments',
        });

        if (response.status === 'ok') {
            yield put(getTherapistsAllPaymentSuccessAction(response.payments))
        } else {
            yield put(getTherapistsAllPaymentFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistsAllPaymentFailureAction(err))
    }
}

export function* therapistConnectionRequestWatcher() {
    yield takeEvery(getTherapistsConnectionRequestAction, getTherapistsConnectionRequestActionSaga);
    yield takeEvery(getTherapistsRejectedConnectionsAction, getTherapistsRejectedConnectionsActionSaga);
    yield takeEvery(getTherapistsActiveConnectionsAction, getTherapistsActiveConnectionsActionSaga);
    yield takeEvery(getTherapistsInActiveConnectionsAction, getTherapistsInActiveConnectionsActionSaga);
    yield takeEvery(getTherapistsReviewsAction, getTherapistsReviewsActionSaga);
    yield takeEvery(getTherapistsSchedulesAction, getTherapistsSchedulesActionSaga);
    yield takeEvery(getTherapistsAllPaymentAction, getTherapistsAllPaymentActionSaga);

}