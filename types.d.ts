/** Type for a project after creation; with full details */
export type Project = NewProject & {
  /** A unique `alpah-num` ID for the project */
  projectId: string;
  /** Date project was created `(in milliseconds)` */
  createdAt: LooseDate;
};

/** Less strict date type. Accepts either `Date` object or number in `milliseconds` */
type LooseDate = Date | number;

/** Describes the status of a task */
type taskStatus = "to-do" | "doing" | "done";

/** Type for a new project without app-added details*/
type NewProject = {
  /** What you'll call the project. A `catchy` name */
  projectName: string;
  /** A lengthy description of the project and what it does */
  projectDescription: string;
  /** An array of `ProjectTask` to be carried out for the project */
  projectTasks: ProjectTask[];
};

/** Type for new project input fields */
type NewProjectInputTypes = {
  projectName: string;
  projectDesc: string;
  initialTask: string;
};

/** Described the type for the core properties of a project task */
type ProjectTaskCore = {
  /** Description of the task to be carried out */
  taskDescription: string;
  /** Text describing the state of the task
   * - `"to-do"` means task is **not** carried out
   * - `"doing"` means task is **currently** being carried out
   * - `"done"` means task is **completely** carried out
   */
  taskStatus: taskStatus;
};

/** Type for a project's task with full details */
type ProjectTask = ProjectTaskCore & {
  /** A numeric ID for task */
  taskId: string;
  /** Date of task creation in app `(in milliseconds)` */
  createdAt: LooseDate;
};

/** Payload type to dispatch when creating new project task */
type AddProjectTaskPayload = ProjectTaskCore & {
  /** `Id` of project that has the task */
  projectId: string;
};

/** Payload type to dispatch when modifying project */
type ModifyProjectPayload = {
  /** `Id` of the project to be modified */
  projectId: string;
  /** modified name of the project */
  projectName: string;
  /** modified description of the project */
  projectDescription: string;
};

type ModifyProjectTaskPayload = ProjectTaskCore & {
  /** `Id` of project task to modify */
  taskId: string;
};

type ProjectIdPayloadType = {
  projectId: string;
};

type ScreensNavigationParams = {
  Projects: undefined;
  Project: ProjectIdPayloadType;
  NewProject: undefined;
  EditProject: ProjectIdPayloadType;
  NewProjectTask: ProjectIdPayloadType;
  EditProjectTask: ProjectIdPayloadType & {taskId: string}
};
