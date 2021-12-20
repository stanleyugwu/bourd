import React from "react";
import { View } from "react-native";
import tw from "../library/tailwind";
import Text, { Title } from "../components/Text";
import SafeAreaView from "../components/SafeArea";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  addProjectTask,
  modifyProject,
  modifyProjectTask,
  removeProject,
  removeProjectTask,
} from "../store/slices/projectsSlice";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import { ScrollView } from "react-native-gesture-handler";

/**
 * @typedef {Object} ProjectType
 * @property {string} projectId A unique `alpah-num` ID for the project
 * @property {string} projectName What you'll call the project. A `catchy` name
 * @property {string} projectDescription A lengthy description of the project and what it does
 * @property {ProjectTask[]} projectTasks An array of tasks to be carried out for the project
 * @property {number} createdAt Date of project creation in app `(in milliseconds)`,
 * typically the return value of `Date.now()`
 */

/**
 * @typedef {Object} ProjectTask
 * @property {number} taskId A numeric ID for task
 * @property {String} taskDescription Description of the task to be carried out
 * @property {"todo" | "doing" | "done"} taskStatus Text describing the state of the task
 * - `"to-do"` means task is not carried out
 * - `"doing"` means task is currently being carried out
 * - `"done"` means task is completely carried out
 * @property {number} createdAt Date of task creation in app `(in milliseconds)`,
 * typically the return value of `Date.now()`
 */

const Projects = () => {
  const dispatch = useDispatch();
  const /** @type {ProjectType[]} */ projects = useSelector(
      (state) => state.projects
    );

  const createProjectTask = (ID) => {
    dispatch(
      addProjectTask({
        projectId: ID,
        taskDescription: "New Task",
        taskStatus: "todo",
      })
    );
  };

  const _removeProject = (ID) => {
    dispatch(removeProject(ID));
  };

  return (
    <SafeAreaView>
      <Button
        title="Press Me"
        iconName="home"
        onPress={() =>
          dispatch(
            addProject({
              projectName: "Bloggie",
              projectDescription: "Blog Web app",
              projectTasks: [],
            })
          )
        }
      />

      {projects.map((project, index) => {
        return (
          <ProjectCard
            key={index.toString()}
            numberOfTasks={20}
            onPress={() => alert('pressed')}
            numberOfCompletedTasks={10}
            projectTitle="Bloggie"
            projectDescription="platform platform platform "
          />
        );
      })}
    </SafeAreaView>
  );
};

/** @type {ProjectType[]} */
const projects = [
  {
    projectId: Math.floor(Math.random() * Date.now()).toPrecision(16),
    projectName: "Goalr",
    projectDescription: "A goal management web app",
    projectTasks: [
      {
        taskId: Math.floor(Math.random() * Date.now()).toPrecision(5),
        taskDescription: "Add Firebase Auth",
        taskStatus: "todo",
        createdAt: Date.now(),
      },
      {
        taskId: Math.floor(Math.random() * Date.now()).toPrecision(5),
        taskDescription: "Implement SSG for performance and SEO",
        taskStatus: "doing",
        createdAt: Date.now(),
      },
      {
        taskId: Math.floor(Math.random() * Date.now()).toPrecision(5),
        taskDescription: "Design the UI/UX",
        taskStatus: "done",
        createdAt: Date.now(),
      },
    ],
    createdAt: Date.now(),
  },
];

export default Projects;
