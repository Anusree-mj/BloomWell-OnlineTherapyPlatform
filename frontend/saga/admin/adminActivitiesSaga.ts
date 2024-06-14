import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAllFeedbacksAction,
    getAllFeedbacksFailureAction,
    getAllFeedbacksSuccessAction,
    getDashboardDetailsAction,
    getDashboardDetailsFailureAction,
    getDashboardDetailsSuccessAction,
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


export function* adminActivityWatcher() {
    yield takeEvery(getAllFeedbacksAction, getAllFeedbacksActionSaga);
    yield takeEvery(getDashboardDetailsAction, getDashboardDetailsActionSaga);

}