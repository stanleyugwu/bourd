import { StackScreenProps } from "@react-navigation/stack";
import { ScreensNavigationParams } from "../../types";
import * as React from "react";
import { Alert, Keyboard, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addProjectTask, projectSelector } from "../store/slices/projectsSlice";
import SafeArea from "../components/SafeArea";
import tw from "../library/tailwind";
import Text, { Title } from "../components/Text";
import Button from "../components/Button";
import TextInputField from "../components/TextInputField";
import { Ionicons as Icon } from "@expo/vector-icons";
import withTile from "../components/HOC/withTile";

/** Screen for creating new project tasks */
const NewProjectTask = ({
  navigation,
  route,
}: StackScreenProps<
  ScreensNavigationParams,
  "NewProjectTask"
>): null | JSX.Element => {
  let projectId = route.params.projectId;
  const project = useSelector((state: RootState) =>
    projectSelector(state, projectId)
  );
  const dispatch = useDispatch();
  const [taskDescription, setTaskDescription] = React.useState("");
  const [taskError, setTaskError] = React.useState("");

  if (!project) {
    navigation.goBack();
    return null;
    // TODO: handle faulty project more gracefully
  }

  const handleTaskDescInput = React.useCallback((text) => {
    setTaskDescription(text);
    setTaskError(""); //wipe error
  }, []);

  const handleSaveTask = React.useCallback(() => {
    if (!taskDescription || !taskDescription?.trim()) {
      return setTaskError("You didn't enter task description");
    }
    dispatch(
      addProjectTask({
        projectId: project.projectId,
        taskStatus: "to-do",
        taskDescription,
      })
    );
    Alert.alert(
      "Task Created Successfully!",
      `New task has been successfully created for project: "${project.projectName}"`
    );
    Keyboard.dismiss();
    // Reset input
    setTaskDescription("");
    setTaskError("");
  }, [taskDescription, project.projectId]);

  return (
    <SafeArea accessibilityLabel="new project screen">
      <View style={tw`flex-row justify-between px-3`}>
        <View style={tw`flex-row`}>
          <Icon name="bulb-sharp" size={20} style={tw`text-black mr-2`} />
          <Title accessibilityLabel="project name">{project.projectName}</Title>
        </View>
        <Text accessibilityLabel="project tasks count">
          Tasks: {project.projectTasks.length}
        </Text>
      </View>
      {/* <Button title='Add New Task' onPress={()=>null} iconName='add-sharp' containerStyle={tw`w-52 mx-auto my-3`} /> */}

      <TextInputField
        placeholder="What do you need to do?"
        fieldTitle={"Task " + (project.projectTasks.length + 1)}
        value={taskDescription}
        accessibilityLabel="new project task input"
        fieldTitleIcon="construct"
        onChangeText={handleTaskDescInput}
        containerStyle={tw`mt-10`}
      />
      {taskError ? (
        <Text
          style={tw`font-bold text-sm text-red-700 ml-1`}
          accessibilityLabel="task error text"
        >
          {"> " + taskError}
        </Text>
      ) : null}
      <Button
        title="Save Task"
        accessibilityLabel="save task button"
        iconName="save-sharp"
        onPress={handleSaveTask}
        containerStyle={tw`mt-10`}
      />
    </SafeArea>
  );
};

export default withTile(NewProjectTask);
