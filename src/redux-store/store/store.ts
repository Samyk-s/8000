import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import packageReducer from "../slices/packageSlice"
import pageReducer from "../slices/pageSlice"
import itineraryReducer from "../slices/itinerarySlice"

const rootReducer = combineReducers({
  packges: packageReducer,
  pages: pageReducer,
  itineraries: itineraryReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "category"], // 👈 use "auth" instead of "user"
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => AppDispatch = useDispatch;