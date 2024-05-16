import { takeEvery, put, call } from 'redux-saga/effects';
import { getSignupApi } from '@/services/clients/auth';
import {
   getClientSignUpAction,
   getClientSignUpFailureAction,
   getClientSignUpSuccessAction
} from '@/store/clients/clientReducer';


// SignupSaga
function* getClientSignUpActionSaga(action: {
    type: string;
    payload: { otp: number, name: '', email: '', password: '', handleSignupSuccess: () => void }
}): any {
    try {
        const response = yield call<any>(getSignupApi, action.payload);
        if (response.status === 'ok') {
            yield put(getClientSignUpSuccessAction(response.client))
            localStorage.setItem("clientData", JSON.stringify(response.client));
            action.payload.handleSignupSuccess()
            console.log('signup success')
        } else {
            yield put(getClientSignUpFailureAction(response.message))
        }
    } catch (err) {
        yield put(getClientSignUpFailureAction(err))
    }
}

export function* clientWatcher() {
    yield takeEvery(getClientSignUpAction, getClientSignUpActionSaga);
}