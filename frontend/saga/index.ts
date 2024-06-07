import { fork, all } from "redux-saga/effects";

import { userWatcher } from "./users/userSaga";
import { clientAuthWatcher } from "./clients/clientSaga";
import { clientConnectionWatcher } from "./clients/clientConnectionSaga";
import { adminAuthWatcher } from "./admin/adminAuthSaga";
import { adminWatcher } from "./admin/adminSaga";
import { therapistAuthWatcher } from "./therapists/therapistAuthSaga";
import { therapistConnectionRequestWatcher } from "./therapists/therapistConnectionHandlerSaga";
import { adminTherapistManageWatcher } from "./admin/adminTherapistManagementSaga";
import { clientMyActionWatcher } from "./clients/clientMyActivitySaga";


export default function* rootSaga(): any {
    yield all([
        yield fork(userWatcher),
        yield fork(clientAuthWatcher),
        yield fork(clientConnectionWatcher),
        yield fork(adminAuthWatcher),
        yield fork(adminWatcher),
        yield fork(therapistAuthWatcher),
        yield fork(therapistConnectionRequestWatcher),
        yield fork(adminTherapistManageWatcher),
        yield fork(clientMyActionWatcher),
    ]);
}
