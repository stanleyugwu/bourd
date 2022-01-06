import { configureStore } from "@reduxjs/toolkit";
import { Project } from "../../types";
import projectsReducer from "./slices/projectsSlice";

export type RootState = {
  projects: Project[]
}

const store = configureStore({
  reducer: {
    projects: projectsReducer,
  }
});

export default store
