import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAllFeedbacksAction, getAllFeedbacksFailureAction, getAllFeedbacksSuccessAction,
    getDashboardDetailsAction, getDashboardDetailsFailureAction, getDashboardDetailsSuccessAction,
    getTherapyCountsAction, getTherapyCountsFailureAction, getTherapyCountsSuccessAction,
    getTopTherapistsAction, getTopTherapistsFailureAction, getTopTherapistsSuccessAction
} from '@/store/admin/adminActivityReducer';
import { apiCall } from '@/services/api';


// get feedbacks
function* getAllFeedbacksActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/feedbacks',
        });
        if (response.status === 'ok') {
            yield put(getAllFeedbacksSuccessAction(response.feedbacks))
        } else {
            yield put(getAllFeedbacksFailureAction(response.message))
        }
    } catch (err) {
        yield put(getAllFeedbacksFailureAction(err))
    }
}
// get dashboard details
function* getDashboardDetailsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/dashboard',
        });
        if (response.status === 'ok') {
            yield put(getDashboardDetailsSuccessAction(response.dashboardDetails))
        } else {
            yield put(getDashboardDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getDashboardDetailsFailureAction(err))
    }
}

// get therapy count details
function* getTherapyCountsActionActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/dashboard/therapyCount',
        });
        if (response.status === 'ok') {
            yield put(getTherapyCountsSuccessAction(response.therapyCount))
        } else {
            yield put(getTherapyCountsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapyCountsFailureAction(err))
    }
}

// get top therapists 
function* getTopTherapistsActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'admin/dashboard/topTherapist',
        });
        if (response.status === 'ok') {
            yield put(getTopTherapistsSuccessAction(response.top5Therapists))
        } else {
            yield put(getTopTherapistsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTopTherapistsFailureAction(err))
    }
}

export function* adminActivityWatcher() {
    yield takeEvery(getAllFeedbacksAction, getAllFeedbacksActionSaga);
    yield takeEvery(getDashboardDetailsAction, getDashboardDetailsActionSaga);
    yield takeEvery(getTherapyCountsAction, getTherapyCountsActionActionSaga);
    yield takeEvery(getTopTherapistsAction, getTopTherapistsActionSaga);

}