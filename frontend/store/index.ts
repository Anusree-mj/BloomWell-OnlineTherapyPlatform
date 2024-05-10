import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { userSlice } from "./user/userReducer";
import rootSaga from '../saga'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userSlice.reducer,

        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;