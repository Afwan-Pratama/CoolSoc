import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {
    persistReducer, 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from 'redux-persist'

import UserSlice from "./Slices/UserSlice";

const reducers = combineReducers({
    user: UserSlice
})

const persistConfig = {
    key : 'root',
    version : 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
reducer: persistedReducer,
middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

const persistor = persistStore(store)

export { store, persistor }