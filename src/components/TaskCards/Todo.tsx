import * as React from "react";
import { ViewStyle, View, Alert } from "react-native";
import { ClassInput } from "tailwind-react-native-classnames";
import tw from "../../library/tailwind";
import { BoxShadow } from "../HOC/withBoxShadow";
import Text from "../Text";
import { Ionicons as Icon, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScreensNavigationParams, Project as ProjectType } from "../../../types";
import { useDispatch } from "react-redux";
import {
  modifyProjectTaskStatus,
  removeProjectTask,
} from "../../store/slices/projectsSlice";
import store from "../../store";

/** Type for project tasks that has "to-do" status*/
type TodoProps = {
  /** Task description */
  todoDescription: string;
  /** The task's `Id`. This will be needed for deleting or editing the todo*/
  todoId: string;
  /** The `ID` of the project that has this todo task. This will be needed for editing todo */
  projectId: string;
  /** Custom accessbility label for component parent `View` */
  accessibilityLabel?: string;
  /** Extra style for component parent `View` */
  containerStyle?: ViewStyle;
};

/** Renders a UI card representing project task having "to-do" status */
const Todo = ({
  containerStyle,
  accessibilityLabel = "todo task",
  todoDescription = "",
  todoId,
  projectId,
}: TodoProps): JSX.Element => {
  const navigation =
    useNavigation<NavigationProp<ScreensNavigationParams, "Project">>();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const toggleTodoExpansion = React.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  const handleDeleteTodo = React.useCallback(() => {
    // Make sure its not the only task. We dont want a project with no tasks
    const project = store.getState().projects.find(project => project.projectId === projectId) as ProjectType;
    if(project.projectTasks.length === 1){
      return alert("You can't delete all the tasks for a project.Each Project must have at-least one task at any given time")
    }

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this todo task?",
      [
        { text: "CANCEL", style: "cancel" },
        {
          text: "DELETE",
          style: "destructive",
          onPress: () => {
            dispatch(removeProjectTask(todoId));
          },
        },
      ]
    );
  }, [todoId]);
  const handleEditTodo = React.useCallback(
    () => navigation.navigate("EditProjectTask", { projectId, taskId: todoId }),
    [projectId, todoId]
  );
  const handleMoveToDoing = React.useCallback(() => {
    let project:ProjectType | undefined = store.getState().projects.find(project => project.projectId === projectId);
    // Error finding project with Id
    if(!project) return alert("An Error Occurred.\nPlease try again, or contact us if issue persists.")
    // Check if project already has an active tast i.e `doing`
    if(project.projectTasks.find(task => task.taskStatus === "doing")){
      return Alert.alert("Couldn't Process Request","There's a task with `doing` status already. You can't be doing more than one task at a time.")
    }
    dispatch(modifyProjectTaskStatus({ taskId: todoId, taskStatus: "doing" }));
  }, [todoId, projectId]);

  return (
    <BoxShadow
      style={tw.style(
        "flex-col justify-between rounded-sm",
        !expanded && "h-28",
        containerStyle as ClassInput
      )}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        accessibilityLabel="todo description container"
        style={tw.style(`pt-2 px-4`, !expanded && { height: "70%" })}
      >
        <Text accessibilityLabel="todo description">{todoDescription}</Text>
      </View>
      <View
        accessibilityLabel="todo card footer"
        style={tw.style(
          `bg-gray-100 flex-row justify-between border-t border-gray-100 px-3`,
          expanded ? "py-1" : { height: "30%" }
        )}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Icon
            name="trash"
            size={22}
            onPress={handleDeleteTodo}
            style={tw`text-red-700`}
            accessibilityLabel="delete icon button"
          />
          <MaterialIcons
            name="edit"
            size={22}
            onPress={handleEditTodo}
            style={tw`text-black mx-5`}
            accessibilityLabel="edit icon button"
          />
          <Text style={tw`text-sm font-bold`} onPress={handleMoveToDoing}>
            Move to Doing
          </Text>
        </View>
        {todoDescription.length > 40 ? (
          <View style={tw`flex-row justify-between items-center`}>
            <Icon
              onPress={toggleTodoExpansion}
              name={expanded ? "chevron-up-sharp" : "chevron-down-sharp"}
              size={26}
              style={tw`text-black ml-6`}
              accessibilityLabel="todo expand button"
            />
          </View>
        ) : null}
      </View>
    </BoxShadow>
  );
};

export default React.memo(Todo);
