import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Project as ProjectType, ScreensNavigationParams } from "../../types";
import { Alert, Keyboard, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  modifyProject,
} from "../store/slices/projectsSlice";
import SafeArea from "../components/SafeArea";
import tw from "../library/tailwind";
import Text from "../components/Text";
import Button from "../components/Button";
import TextInputField from "../components/TextInputField";
import withTile from "../components/HOC/withTile";

/** Screen for editing project */
const EditProject = ({
  navigation,
  route,
}: StackScreenProps<ScreensNavigationParams, "EditProject">): JSX.Element => {
  let projectId = route.params.projectId;
  const projects = useSelector((state: RootState) => state.projects);
  const project = projects.find(
    (project) => project.projectId === projectId
  ) as ProjectType;
  const dispatch = useDispatch();

  // For Project Name
  const [projectName, setProjectName] = React.useState(project.projectName);
  const [nameError, setNameError] = React.useState("");

  // For Project Description
  const [description, setDescription] = React.useState(
    project.projectDescription
  );
  const [descriptionError, setDescriptionError] = React.useState("");

  const handleNameInput = React.useCallback((text) => {
    setProjectName(text);
    setNameError(""); //wipe error
  }, []);

  const handleDescriptionInput = React.useCallback((text) => {
    setDescription(text);
    setDescriptionError(""); //wipe error
  }, []);

  const handleSaveChanges = React.useCallback(() => {
    if (!projectName || !projectName?.trim()) {
      return setNameError("You didn't enter project's name");
    }
    if (!description || !description?.trim()) {
      return setDescriptionError("You didn't enter project's description");
    }
    // get other projects apart from current one
    // so to check for duplicate project `names`
    let restOfProjects = projects.filter(
      (_project) => _project.projectId !== project.projectId
    );
    if (
      projectName &&
      !!restOfProjects.find((project) => project.projectName === projectName)
    ) {
      return setNameError("A project with that name already exists");
    }

    dispatch(
      modifyProject({
        projectId: project.projectId,
        projectName,
        projectDescription: description,
      })
    );

    Alert.alert(
      "Changes Applied Successfully!",
      `Your changes was applied successfully`
    );
    Keyboard.dismiss()
    navigation.navigate("Projects");
  }, [projectName, project.projectId, description]);

  // Graceful fallback for when no project with passed id exists,
  // or `handleDeleteProject` failed to navigate back to `Projects` screen after deletion
  if (!project) {
    return <Text>Error Loading project.</Text>;
  }

  return (
    <SafeArea accessibilityLabel="edit project screen">
      <View style={tw`flex-row justify-center px-3 my-4`}>
        <Text style={tw`font-bold text-center`}>
          Editing Project: {project.projectName}
        </Text>
      </View>

      <TextInputField
        fieldTitle="What would you now call this project?"
        placeholder="Project Name"
        fieldTitleIcon="construct"
        containerStyle={tw`mt-4`}
        value={projectName}
        onChangeText={handleNameInput}
      />
      {nameError ? (
        <Text
          style={tw`font-bold text-sm text-red-700 ml-1 mb-3`}
          accessibilityLabel="project name error text"
        >
          {"> " + nameError}
        </Text>
      ) : null}

      <TextInputField
        fieldTitle="How would you now pitch this idea?"
        placeholder="Project Description"
        fieldTitleIcon="text"
        value={description}
        onChangeText={handleDescriptionInput}
      />
      {descriptionError ? (
        <Text
          style={tw`font-bold text-sm text-red-700 ml-1`}
          accessibilityLabel="project description error text"
        >
          {"> " + descriptionError}
        </Text>
      ) : null}
      <Button
        title="Save Changes"
        accessibilityLabel="save project changes button"
        iconName="save-sharp"
        onPress={handleSaveChanges}
        containerStyle={tw`mt-10`}
      />
    </SafeArea>
  );
};

export default withTile(EditProject);
