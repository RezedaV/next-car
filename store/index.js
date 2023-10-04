import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {carApi} from "../services/carService";
import {setupListeners} from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
    [carApi.reducerPath]: carApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(carApi.middleware),
})


setupListeners(store.dispatch)
