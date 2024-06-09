import { takeEvery, put, call } from 'redux-saga/effects';
import { apiCall } from '@/services/api';
import {
    getTherapistSignUpAction,
    getTherapistSignUpFailureAction,
    getTherapistSignUpSuccessAction,
    saveTherapistDetailsAction,
    saveTherapistDetailsSuccessAction,
    saveTherapistDetailsFailureAction,
    getTherapistDetailsAction,
    getTherapistDetailsFailureAction,
    getTherapistDetailsSuccessAction,
    getTherapistProfileAction,
    getTherapistProfileFailureAction,
    getTherapistProfileSuccessAction,
} from '@/store/therapists/therapistReducers';


// SignupSaga
function* getTherapistSignUpActionSaga(action: {
    type: string;
    payload: {
        otp: number, name: '', email: '', password: '', phone: number, licenseNum: '', roleType: '',
        image: '', handleTherapistSignupSuccess: () => void
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'therapist/signup',
            body: action.payload
        });

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
        email: '', licenseNo: '', expertise: [], country: '', expiryDate: '', experience: '',
        gender: '', description: '', image: '', handleSaveTherapistDataSuccess: () => void
    }
}): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'POST',
            endpoint: 'therapist',
            body: action.payload
        });

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

// get therapist view details Saga
function* getTherapistDetailsActionSaga(action: {
    type: string;
    payload: {
        therapistId: ''
    }
}): any {
    try {
        console.log('entered in saga')
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: `admin/therapists/${action.payload}`,
        });

        if (response.status === 'ok') {
            console.log('status okkkk')
            yield put(getTherapistDetailsSuccessAction(response))
        } else {
            console.log('status dvvvvvvvvvvvokkkk')

            yield put(getTherapistDetailsFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistDetailsFailureAction(err))
    }
}

// get therapist profile
function* getTherapistProfileActionSaga(): any {
    try {
        const response = yield call<any>(apiCall, {
            method: 'GET',
            endpoint: 'therapist/profile',
        });
        if (response.status === 'ok') {
            yield put(getTherapistProfileSuccessAction(response.therapist))
            localStorage.setItem("therapistData", JSON.stringify(response.therapist));
        } else {
            yield put(getTherapistProfileFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistProfileFailureAction(err))
    }
}


export function* therapistAuthWatcher() {
    yield takeEvery(getTherapistSignUpAction, getTherapistSignUpActionSaga);
    yield takeEvery(saveTherapistDetailsAction, saveTherapistDetailsActionSaga);
    yield takeEvery(getTherapistDetailsAction, getTherapistDetailsActionSaga);
    yield takeEvery(getTherapistProfileAction, getTherapistProfileActionSaga);

}