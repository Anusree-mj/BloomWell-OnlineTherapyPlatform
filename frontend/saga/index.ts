import { fork, all } from "redux-saga/effects";

import { userWatcher } from "./users/userSaga";
import { clientWatcher } from "./clients/clientSaga";
import { adminWatcher } from "./admin/adminSaga";

export default function* rootSaga(): any {
    yield all([
        yield fork(userWatcher),
        yield fork(clientWatcher),
        yield fork(adminWatcher),
    ]);
}
