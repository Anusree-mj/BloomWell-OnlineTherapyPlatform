import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getTherapistSignupApi,
    saveTherapistDetailsApi
} from '@/services/clients/auth';
import {
    getTherapistSignUpAction,
    getTherapistSignUpFailureAction,
    getTherapistSignUpSuccessAction,
    saveTherapistDetailsAction,
    saveTherapistDetailsSuccessAction,
    saveTherapistDetailsFailureAction
} from '@/store/therapists/therapistReducers';


// SignupSaga
function* getTherapistSignUpActionSaga(action: {
    type: string;
    payload: {
        otp: number, name: '', email: '', password: '', phone: number, licenseNum: '', roleType: '',
        handleTherapistSignupSuccess: () => void
    }
}): any {
    try {
        const response = yield call<any>(getTherapistSignupApi, action.payload);
        if (response.status === 'ok') {
            yield put(getTherapistSignUpSuccessAction(response.therapist))
            localStorage.setItem("therapistData", JSON.stringify(response.therapist));
            action.payload.handleTherapistSignupSuccess()
            console.log('Therapistsignup success')
        } else {
            yield put(getTherapistSignUpFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistSignUpFailureAction(err))
    }
}

// save therapistsDetailsSaga
function* saveTherapistDetailsActionSaga(action: {
    type: string;
    payload: {
        email: '', expertise: [], country: '', expiryDate: '', experience: '', description: '',
        image: '', handleSaveTherapistDataSuccess: () => void
    }
}): any {
    try {
        const response = yield call<any>(saveTherapistDetailsApi, action.payload);
        if (response.status === 'ok') {
            yield put(saveTherapistDetailsSuccessAction(response.therapist))

            localStorage.setItem("therapistData", JSON.stringify(response.therapist));
            action.payload.handleSaveTherapistDataSuccess()
        } else {
            yield put(saveTherapistDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(saveTherapistDetailsFailureAction(err))
    }
}

export function* therapistWatcher() {
    yield takeEvery(getTherapistSignUpAction, getTherapistSignUpActionSaga);
    yield takeEvery(saveTherapistDetailsAction, saveTherapistDetailsActionSaga);
}