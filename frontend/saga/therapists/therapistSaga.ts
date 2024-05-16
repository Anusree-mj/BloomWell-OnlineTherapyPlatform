import { takeEvery, put, call } from 'redux-saga/effects';
import { getTherapistSignupApi } from '@/services/clients/auth';
import {
    getTherapistSignUpAction,
    getTherapistSignUpFailureAction,
    getTherapistSignUpSuccessAction
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
            localStorage.setItem("therapistata", JSON.stringify(response.therapist));
            action.payload.handleTherapistSignupSuccess()
            console.log('Therapistsignup success')
        } else {
            yield put(getTherapistSignUpFailureAction(response.message))
        }
    } catch (err) {
        yield put(getTherapistSignUpFailureAction(err))
    }
}

export function* therapistWatcher() {
    yield takeEvery(getTherapistSignUpAction, getTherapistSignUpActionSaga);
}