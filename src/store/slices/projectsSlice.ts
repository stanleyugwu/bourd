import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddProjectTaskPayload,
  ModifyProjectPayload,
  ModifyProjectTaskPayload,
  NewProject,
  Project,
} from "../../../types";
import { RootState as RootStateType } from "../index";

export const initialState: Project[] = [];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<NewProject>): void {
      // below logic ensures payload contains just the data needed, and does nothing otherwise
      if (
        !(action.payload instanceof Object) ||
        !action.payload.projectName ||
        !action.payload.projectDescription ||
        !action.payload.projectTasks ||
        !(action.payload.projectTasks instanceof Array) ||
        Object.keys(action.payload).length !== 3
      ) {
        return;
      }

      state.push({
        ...action.payload,
        projectId: Math.floor(Math.random() * Date.now()).toString(36),
        createdAt: Date.now(),
      });
    },
    removeProject(state, action: PayloadAction<string>): void {
      let projectId = action.payload;
      if (!projectId) return;
      state.forEach((project, index) => {
        if (project.projectId === projectId) {
          state.splice(index, 1);
        }
      });
    },
    modifyProject(state, action: PayloadAction<ModifyProjectPayload>): void {
      const { projectId, ...updates } = action.payload;
      if (!updates.projectName || !updates.projectDescription) return;

      state.forEach((project, index) => {
        if (project.projectId === projectId) {
          state[index] = {
            ...project,
            ...updates,
          };
        }
      });
    },
    addProjectTask(state, action: PayloadAction<AddProjectTaskPayload>): void {
      let payload = action.payload;
      if (
        !payload.taskDescription ||
        !payload.taskStatus ||
        !payload.projectId ||
        ["to-do", "doing", "done"].indexOf(payload.taskStatus) === -1
      ) return

      state.forEach((project) => {
        if (project.projectId === payload.projectId) {
          project?.projectTasks?.push({
            taskId: Math.floor(Math.random() * Date.now()).toString(36),
            taskStatus: payload.taskStatus,
            createdAt: new Date(),
            taskDescription: payload.taskDescription,
          });
        }
      });
    },
    removeProjectTask(state, action: PayloadAction<string>) {
      let taskId = action.payload;
      if (!taskId) return;

      state.forEach((project) => {
        project.projectTasks.forEach((task, index) => {
          if (task.taskId === taskId) {
            project.projectTasks.splice(index, 1);
          }
        });
      });
    },

    modifyProjectTask(
      state,
      action: PayloadAction<ModifyProjectTaskPayload>
    ): void {
      let payload: ModifyProjectTaskPayload = action.payload;

      //assert correct payload was passed
      if (
        !(payload instanceof Object) ||
        !payload.taskDescription ||
        !payload.taskStatus ||
        !payload.taskId ||
        ["todo", "doing", "done"].indexOf(payload.taskStatus) === -1
      )
        return;

      let { taskId, ...updates } = payload;
      state.forEach((project) => {
        project.projectTasks.forEach((task, index) => {
          if (task.taskId === taskId) {
            project.projectTasks[index] = {
              ...task,
              ...updates,
            };
          }
        });
      });
    },
  },
});

export const {
  addProject,
  removeProject,
  modifyProject,
  addProjectTask,
  removeProjectTask,
  modifyProjectTask,
} = projectsSlice.actions;

export const projectSelector = (state: RootStateType, projectId: string) =>
  state.projects.find((project) => project.projectId === projectId);

export default projectsSlice.reducer;
