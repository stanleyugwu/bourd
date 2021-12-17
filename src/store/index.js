import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";

/**
 * @typedef {Object} RootState
 * @property {import("../screens/Projects").ProjectType[]} projects
 */
export default store = configureStore({
  reducer: /** @type {RootState} */ {
    projects: projectsReducer,
  },
});
