import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAllFeedbacksAction,
    getAllFeedbacksFailureAction,
    getAllFeedbacksSuccessAction
} from '@/store/admin/adminActivityReducer';
import { apiCall } from '@/services/api';


// adminLoginSaga
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

export function* adminActivityWatcher() {
    yield takeEvery(getAllFeedbacksAction, getAllFeedbacksActionSaga);
}