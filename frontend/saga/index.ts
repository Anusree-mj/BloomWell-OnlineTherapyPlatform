import { fork, all } from "redux-saga/effects";

import { userWatcher } from "./users/userSaga";
import { clientAuthWatcher } from "./clients/clientAuthSaga";
import { clientConnectionWatcher } from "./clients/clientConnectionSaga";
import { adminAuthWatcher } from "./admin/adminAuthSaga";
import { adminWatcher } from "./admin/adminSaga";
import { therapistAuthWatcher } from "./therapists/therapistAuthSaga";

export default function* rootSaga(): any {
    yield all([
        yield fork(userWatcher),
        yield fork(clientAuthWatcher),
        yield fork(clientConnectionWatcher),
        yield fork(adminAuthWatcher),
        yield fork(adminWatcher),
        yield fork(therapistAuthWatcher),
    ]);
}
