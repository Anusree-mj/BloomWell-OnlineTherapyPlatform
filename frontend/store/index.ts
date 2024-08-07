import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { userSlice } from "./user/userReducer";
import { clientSlice } from "./clients/clientReducer";
import { clientConnectionSlice } from "./clients/clientConnectionReducer";
import { adminSlice } from "./admin/adminReducer";
import { therapistSlice } from "./therapists/therapistReducers";
import { therapistActivitiesSlice } from "./therapists/therapistActvitiesHandlerReducers";
import { adminConnectionSlice } from "./admin/adminConnectionReducer";
import { clientMyActivitySlice } from "./clients/clientMyActionReducer";
import { adminActivitiesSlice } from "./admin/adminActivityReducer";

import rootSaga from '../saga'


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        client: clientSlice.reducer,
        clientConnection: clientConnectionSlice.reducer,
        admin: adminSlice.reducer,
        therapist: therapistSlice.reducer,
        therapistActivities: therapistActivitiesSlice.reducer,
        adminConnectionRequests: adminConnectionSlice.reducer,
        clientMyActivity: clientMyActivitySlice.reducer,
        adminActivities: adminActivitiesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = {
    
}