import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} NewProjectPayload
 * @property {string} projectName What you'll call the project. A `catchy` name
 * @property {string} projectDescription A lengthy description of the project and what it does
 * @property {import("../../screens/Projects").ProjectTask[]} projectTasks An array of tasks to be carried out for the project
 */

/**
 * @typedef {string} RemoveProjectPayload The `projectId` of the project to to remove
 */

/**
 * @typedef {Object} ModifyProjectPayload
 * @property {string} projectId `Id` of project to modify
 * @property {string} projectName What you'll call the project. A `catchy` name
 * @property {string} projectDescription A lengthy description of the project and what it does
 */

/**
 * @typedef {Object} AddProjectTaskPayload
 * @property {string} projectId `Id` of project to add task to
 * @property {String} taskDescription Description of the task to be carried out
 * @property {"todo" | "doing" | "done"} taskStatus Text describing the state of the task
 * - `"to-do"` means task is not carried out
 * - `"doing"` means task is currently being carried out
 * - `"done"` means task is completely carried out
 */

/**
 * @typedef {Object} ModifyProjectTaskPayload
 * @property {string} taskId `ID` of task to modify
 * @property {string} taskDescription Task description
 * @property {"todo" | "doing" | "done"} taskStatus either "todo", "doing", or "done"
 */

/** @type {import("../../screens/Projects").ProjectType[]} */
export const initialState = [];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    /** Constructs a new project from passed data payload. \
     *  Payload object should have:
     * - `projectName` Name of the project
     * - `projectDescription` Description
     * - `projectTasks` Array of tasks set for the project, this should be `[]` in case of no tasks
     * @param {{payload:NewProjectPayload}} action
     */
    addProject(state, action) {
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
    /**
     * Removes a project with given `projectId`
     * @param {{payload:RemoveProjectPayload}} action
     */
    removeProject(state, action) {
      let projectId = action.payload;
      if (!projectId) return;
      state.forEach((project, index) => {
        if (project.projectId === projectId) {
          state.splice(index, 1);
        }
      });
    },

    /** Modifies project with given `projectId`.\
     * Payload object should have:
     * - `projectId` Id of the project
     * - `projectName` new project name
     * - `projectDescription` new project description
     * @param {{payload:ModifyProjectPayload} action
     */
    modifyProject(state, action) {
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

    /**
     * Adds a new task to a project with the given ID.
     * payload object should have:
     * - `projectId` Project to add task to
     * - `taskDescription`
     * - `taskStatus` one of "todo", "doing", or "done"
     * @param {{payload:AddProjectTaskPayload}} action
     */
    addProjectTask(state, action) {
      let task = action.payload;
      if (
        !task.taskDescription ||
        !task.taskStatus ||
        !task.projectId ||
        ["todo", "doing", "done"].indexOf(task.taskStatus) === -1
      )
        return;

      state.forEach((project) => {
        if (project.projectId === task.projectId) {
          project?.projectTasks?.push({
            taskId: Math.floor(Math.random() * Date.now()).toString(36),
            taskStatus: task.taskStatus,
            taskDescription: task.taskDescription,
            createdAt: Date.now(),
          });
        }
      });
    },

    /** Removes a task from the project with given `taskId` */
    removeProjectTask(state, action) {
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

    /** Modifies project task. Payload object should be:
     * - `taskId` id of the task to modify
     * - `taskStatus` either "todo", "doing", or "done"
     * - `taskDescription` Description of the task
     * @param {{payload:ModifyProjectTaskPayload}} action
     */
    modifyProjectTask(state, action) {
      let task = action.payload;

      //assert correct payload was passed
      if (
        !(task instanceof Object) ||
        !task.taskDescription ||
        !task.taskStatus ||
        !task.taskId ||
        ["todo", "doing", "done"].indexOf(task.taskStatus) === -1
      )
        return;

      let { taskId, ...updates } = task;
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

export const projectSelector = (state, projectId) =>
  state.projects.find((project) => project.projectId === projectId);

export default projectsSlice.reducer;
