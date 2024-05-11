import { fork, all } from "redux-saga/effects";

import { userWatcher } from "./users/userSaga";
import { clientWatcher } from "./clients/clientSaga";

export default function* rootSaga(): any {
    yield all([
        yield fork(userWatcher),
        yield fork(clientWatcher),

    ]);
}
