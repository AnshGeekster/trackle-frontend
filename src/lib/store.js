"use client"; // Required for Next.js App Router

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import userReducer from "./features/user/userSlice"; // Import user reducer

// Combine reducers (Make sure values are valid reducers)
const rootReducer = combineReducers({
  user: userReducer, // Ensure it's correctly passed
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer, // Ensure reducer is correctly assigned
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persistor
export const persistor = persistStore(store);
