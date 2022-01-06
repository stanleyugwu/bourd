import { configureStore, } from "@reduxjs/toolkit";
import { Project } from "../../types";
import projectsReducer from "./slices/projectsSlice";
import {PersistConfig, persistCombineReducers, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST} from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

export type RootState = {
  projects: Project[]
}

const persistConfig:PersistConfig<RootState> = {
  key:"root",
  version:1,
  storage:ExpoFileSystemStorage,
}

let persistedReducer = persistCombineReducers(persistConfig, {projects:projectsReducer});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
      ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export default store
