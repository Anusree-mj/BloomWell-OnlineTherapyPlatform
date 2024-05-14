import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { userSlice } from "./user/userReducer";
import { clientSlice } from "./clients/clientReducer";
import { adminSlice } from "./admin/adminReducer";
import rootSaga from '../saga'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        client: clientSlice.reducer,
        admin: adminSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;