import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Project as ProjectType,
  ProjectTask,
  ScreensNavigationParams,
  taskStatus as ProjectTaskStatus,
} from "../../types";
import SafeArea from "../components/SafeArea";
import Text, { Title } from "../components/Text";
import { RootState } from "../store";
import { projectSelector, removeProject } from "../store/slices/projectsSlice";
import { Ionicons as Icon } from "@expo/vector-icons";
import tw from "../library/tailwind";
import { TouchableHighlight } from "react-native-gesture-handler";
import Todo from "../components/TaskCards/Todo";
import Doing from "../components/TaskCards/Doing";
import Done from "../components/TaskCards/Done";
import withTile from "../components/HOC/withTile";

/** Screen for displaying individual project */
const Project = ({
  navigation,
  route,
}: StackScreenProps<ScreensNavigationParams, "Project">): JSX.Element => {
  const project = useSelector((state: RootState) =>
    projectSelector(state, route.params.projectId)
  ) as ProjectType;

  /* Go back to previous screen if there's no project with `Id` found */
  React.useEffect(() => {}, []);

  const dispatch = useDispatch();
  const [activeTasksTab, setActiveTasksTab] = React.useState<1 | 2 | 3>(() =>
    project.projectTasks.filter((task) => task.taskStatus == "doing").length > 0
      ? 2
      : 1
  );

  /** The horizontal bar shown at the top of the active tab icon*/
  const ActiveTabBar = React.useMemo(
    () => <View style={tw`w-full h-1.5 rounded-b-md bg-accent`} />,
    []
  );

  /** Filters out tasks which has given `taskStatus` from project */
  const tasksFilter = (taskStatus: ProjectTaskStatus) =>
    project.projectTasks.filter((task) => task.taskStatus === taskStatus);

  /** Returns an array of `<Todo/>` components for `todo` tasks*/
  const getTodoTasks = React.useCallback(() => {
    const todos: ProjectTask[] = tasksFilter("to-do");
    if (todos.length === 0) {
      return (
        <Text style={tw`text-center mt-4`}>
          No More Tasks To carry out. Bravo!!!!!
        </Text>
      );
    }
    return todos.map((todoTask): JSX.Element => {
      return (
        <Todo
          projectId={project.projectId}
          key={todoTask.taskId}
          todoId={todoTask.taskId}
          todoDescription={todoTask.taskDescription}
          containerStyle={tw`my-3`}
        />
      );
    });
  }, [project]);

  /** Returns an array of `<Doing/>` components for active task*/
  const getDoingTask = React.useCallback(() => {
    const activeTask = project.projectTasks.find(
      (task) => task.taskStatus === "doing"
    );
    if (!activeTask) {
      return (
        <Text style={tw`text-center mt-4`}>
          No Active Task.{"\n"}Go to Todos tab and move one here
        </Text>
      );
    }
    return (
      <Doing
        taskDescription={activeTask.taskDescription}
        taskId={activeTask.taskId}
      />
    );
  }, [project]);

  /** Returns an array of `<Done/>` components for completed tasks */
  const getDoneTasks = React.useCallback(() => {
    const doneTasks = project.projectTasks.filter(
      (task) => task.taskStatus === "done"
    );
    if (doneTasks.length === 0) {
      return (
        <Text style={tw`text-center mt-4`}>
          No task completed yet!. Rock on!.
        </Text>
      );
    }
    return doneTasks.map((doneTask): JSX.Element | undefined => {
      return (
        <Done
          key={doneTask.taskId}
          taskId={doneTask.taskId}
          taskDescription={doneTask.taskDescription}
          containerStyle={tw`my-3`}
        />
      );
    });
  }, [project]);

  const handleEditProject = React.useCallback(() => {
    navigation.navigate("EditProject", { projectId: project.projectId });
  }, []);
  const handleDeleteProject = React.useCallback(() => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        { text: "CANCEL", style: "cancel" },
        {
          text: "DELETE",
          style: "destructive",
          onPress: () => {
            dispatch(removeProject(project.projectId));
            navigation.navigate("Projects");
          },
        },
      ]
    );
  }, []);

  // Graceful fallback for when no project with passed id exists,
  // or `handleDeleteProject` failed to navigate back to `Projects` screen after deletion
  if (!project) {
    return <Text>Error Loading project.</Text>;
  }
  return (
    <SafeArea style={tw`px-0`}>
      <View style={tw`flex-row justify-between items-center mb-4 px-2`}>
        <View
          style={tw.style(`flex-row items-center`, {
            width: "50%",
            marginRight: "6%",
          })}
        >
          <Icon name="bulb-sharp" size={20} style={tw`text-black mr-2`} />
          <Title style={tw`flex-wrap`} accessibilityLabel="project name">
            {project.projectName}
          </Title>
        </View>

        <View
          style={tw.style(`flex-row items-center justify-end`, {
            width: "45%",
          })}
        >
          <Icon
            name="add-sharp"
            size={27}
            onPress={() =>
              navigation.navigate("NewProjectTask", {
                projectId: project.projectId,
              })
            }
            style={tw`text-black border border-gray-400 rounded-md p-1`}
            accessibilityLabel="project edit icon"
          />
          <Icon
            name="pencil-sharp"
            size={20}
            onPress={handleEditProject}
            style={tw`text-black border border-gray-400 rounded-md p-2 mx-3`}
            accessibilityLabel="project edit icon"
          />
          <Icon
            name="trash-sharp"
            size={20}
            onPress={handleDeleteProject}
            style={tw`text-black border border-gray-400 rounded-md p-2`}
            accessibilityLabel="project delete icon"
          />
        </View>
      </View>

      <Text style={tw`font-bold text-gray-500 mb-1 px-3`}>
        Project Description:
      </Text>
      <Text accessibilityLabel="project description" style={tw`px-3`}>
        {project.projectDescription}
      </Text>

      <View
        style={tw`flex-col justify-between px-3 mt-3`}
        accessibilityLabel="tasks stats wrapper"
      >
        <Text style={tw`font-bold text-gray-500`}>Task Stats:</Text>
        <View style={tw`flex-row justify-between`}>
          <Text>Todos:{tasksFilter("to-do").length}</Text>
          <Text>Doing:{tasksFilter("doing").length}</Text>
          <Text>Done:{tasksFilter("done").length}</Text>
        </View>
      </View>

      <View style={tw`mt-6`}>
        <View
          accessibilityLabel="project tasks tab container"
          style={tw`bg-primary rounded-md flex-row justify-between px-5`}
        >
          <TouchableHighlight
            accessibilityLabel="todo tasks button"
            activeOpacity={0.7}
            onPress={() => setActiveTasksTab(1)}
          >
            <>
              {activeTasksTab === 1 ? ActiveTabBar : null}
              <Icon
                name="construct"
                size={20}
                style={tw`text-gray-200 mx-auto pt-1.5`}
              />
              <Text
                style={tw.style(
                  `text-sm font-bold`,
                  activeTasksTab === 1 ? "text-accent" : "text-gray-200"
                )}
              >
                Todos
              </Text>
            </>
          </TouchableHighlight>

          <TouchableHighlight
            accessibilityLabel="active tasks button"
            activeOpacity={0.7}
            onPress={() => setActiveTasksTab(2)}
          >
            <>
              {activeTasksTab === 2 ? ActiveTabBar : null}
              <Icon
                name="build"
                size={20}
                style={tw`text-gray-200 mx-auto pt-1.5`}
              />
              <Text
                style={tw.style(
                  `text-sm font-bold`,
                  activeTasksTab === 2 ? "text-accent" : "text-gray-200"
                )}
              >
                Doing
              </Text>
            </>
          </TouchableHighlight>

          <TouchableHighlight
            accessibilityLabel="done tasks button"
            activeOpacity={0.7}
            onPress={() => setActiveTasksTab(3)}
          >
            <>
              {activeTasksTab === 3 ? ActiveTabBar : null}
              <Icon
                name="checkmark"
                size={20}
                style={tw`text-gray-200 mx-auto pt-1.5`}
              />
              <Text
                style={tw.style(
                  `text-sm font-bold`,
                  activeTasksTab === 3 ? "text-accent" : "text-gray-200"
                )}
              >
                Done
              </Text>
            </>
          </TouchableHighlight>
        </View>

        <View style={tw`px-3 py-4`}>
          {activeTasksTab === 1
            ? getTodoTasks()
            : activeTasksTab === 2
            ? getDoingTask()
            : getDoneTasks()}
        </View>
      </View>
    </SafeArea>
  );
};

export default withTile(Project);
