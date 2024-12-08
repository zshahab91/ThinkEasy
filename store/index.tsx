import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice";
import { postReducer } from "./postSlice";

// configure which keuy we want to persist
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};
const postPersistConfig = {
  key: "post",
  storage: storage,
  whitelist: ["postsState"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  post: persistReducer(postPersistConfig, postReducer),

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});