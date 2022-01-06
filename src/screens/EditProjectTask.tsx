import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Project as ProjectType,
  ProjectTask,
  ScreensNavigationParams,
} from "../../types";
import { Alert, Keyboard, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { modifyProjectTask } from "../store/slices/projectsSlice";
import SafeArea from "../components/SafeArea";
import tw from "../library/tailwind";
import Text from "../components/Text";
import Button from "../components/Button";
import TextInputField from "../components/TextInputField";
import withTile from "../components/HOC/withTile";

/** Screen for editing project task */
const EditProjectTask = ({
  navigation,
  route,
}: StackScreenProps<
  ScreensNavigationParams,
  "EditProjectTask"
>): JSX.Element => {
  const projectId = route.params.projectId;
  const taskId = route.params.taskId;

  const project = useSelector(
    (state: RootState) =>
      state.projects.find(
        (project) => project.projectId === projectId
      ) as ProjectType
  );
  const task = project.projectTasks.find(
    (task) => task.taskId === taskId
  ) as ProjectTask;
  const taskIndex = project.projectTasks.findIndex(
    (task) => task.taskId === taskId
  );
  const dispatch = useDispatch();

  // For Task Description
  const [description, setDescription] = React.useState(task?.taskDescription);
  const [descriptionError, setDescriptionError] = React.useState("");

  const handleDescriptionInput = React.useCallback((text) => {
    setDescription(text);
    setDescriptionError(""); //wipe error
  }, []);

  const handleSaveChanges = React.useCallback(() => {
    if (!description || !description?.trim()) {
      return setDescriptionError("You didn't enter task's description");
    }

    dispatch(
      modifyProjectTask({
        taskDescription: description,
        taskId: task.taskId,
        taskStatus: task.taskStatus,
      })
    );

    Alert.alert(
      "Changes Applied Successfully!",
      `Your changes was applied successfully`
    );
    Keyboard.dismiss();
    navigation.goBack();
  }, [description, task.taskId, task.taskStatus]);

  // Graceful fallback for when no project with passed id exists.
  if (!project) {
    return <Text>Error Loading project.</Text>;
  }

  return (
    <SafeArea accessibilityLabel="edit project task screen">
      <View style={tw`flex-row justify-center px-3 my-4`}>
        <Text style={tw`font-bold text-center`}>
          Editing Project Task For: {project.projectName}
        </Text>
      </View>

      <TextInputField
        fieldTitle={"Task " + (taskIndex + 1)}
        placeholder="What do you now need to do?"
        fieldTitleIcon="text"
        value={description}
        onChangeText={handleDescriptionInput}
      />
      {descriptionError ? (
        <Text
          style={tw`font-bold text-sm text-red-700 ml-1`}
          accessibilityLabel="project-task description error text"
        >
          {"> " + descriptionError}
        </Text>
      ) : null}
      <Button
        title="Save Changes"
        accessibilityLabel="save-project-task-changes button"
        iconName="save-sharp"
        onPress={handleSaveChanges}
        containerStyle={tw`mt-10`}
      />
    </SafeArea>
  );
};

export default withTile(EditProjectTask, 2);
