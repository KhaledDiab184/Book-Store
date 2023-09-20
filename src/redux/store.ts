import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import  HideHeader  from "./HideSlice";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import BookSlice from "./BookSlice";

const persistConfig = {
  key: "root",
  storage,
 
};

const rootReducer = combineReducers({
  auth: authSlice,
  Hide: HideHeader,
  books:BookSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor  = persistStore(store);
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;