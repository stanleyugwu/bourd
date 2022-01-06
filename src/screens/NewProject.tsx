import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Project, ScreensNavigationParams, NewProjectInputTypes } from "../../types";
import SafeArea from "../components/SafeArea";
import Text from "../components/Text";
import tw from "../library/tailwind";
import TextInputField from "../components/TextInputField";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProject, addProjectTask } from "../store/slices/projectsSlice";
import { Alert, Keyboard } from "react-native";
import store, { RootState } from "../store";
import withTile from "../components/HOC/withTile";

/** Initial input values for form fields */
const initialInputValues = {
  projectName: "",
  projectDesc: "",
  initialTask: "",
};

/** Screen for creating new project */
const NewProject = ({
  navigation,
}: StackScreenProps<ScreensNavigationParams, "NewProject">): JSX.Element => {
  const [values, setValues] =
    React.useState<NewProjectInputTypes>(initialInputValues);
  const [errors, setErrors] =
    React.useState<NewProjectInputTypes>(initialInputValues);

  let projects = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  // below variable will be dynamically assigned when new project is created
  // Its made global so other functions can read it
  let newlyCreatedProject:React.MutableRefObject<Project | undefined> = React.useRef();

  /** Inputs Validator */
  const validateForm = React.useCallback((): void => {
    if (!values.projectName || !values.projectName?.trim())
      return setErrors({
        ...errors,
        projectName: "You didn't enter a project name",
      });
    if (
      values.projectName &&
      !!projects.find((project) => project.projectName === values.projectName)
    ) {
      return setErrors({
        ...errors,
        projectName: "A project with that name already exists",
      });
    }
    if (!values.projectDesc || !values.projectDesc?.trim())
      return setErrors({
        ...errors,
        projectDesc: "You didn't describe the project",
      });
    if (!values.initialTask || !values.initialTask?.trim())
      return setErrors({
        ...errors,
        initialTask: "You didn't set an initial task",
      });

    //Inputs Valid.
    // Create project without task
    dispatch(
      addProject({
        projectName: values.projectName,
        projectDescription: values.projectDesc,
        projectTasks: [],
      })
    );

    // Get newly created project
    projects = store.getState().projects;
    newlyCreatedProject.current = projects[projects.length - 1];

    // Add the initial task to it
    if (
      newlyCreatedProject.current &&
      newlyCreatedProject.current?.projectName === values.projectName
    ) {
      dispatch(
        addProjectTask({
          projectId: newlyCreatedProject.current.projectId,
          taskStatus: "to-do",
          taskDescription: values.initialTask,
        })
      );
    } else {
      return alert(
        "An error occured while creating your project. Please try again, and if the problem persists contact us"
      );
    }

    Keyboard.dismiss();
    // Ask user if he wants to add more tasks
    Alert.alert(
      "Project Created Successfully!.",
      "\nDo you want to add more tasks?",
      [
        { text: "YES", onPress: handleAddMoreTask },
        { text: "NO", onPress: goToProjectsScreen },
      ]
    );
  }, Object.values(values));

  /** Utility function to reset form fields */
  const resetError = (fieldName: keyof NewProjectInputTypes): void => {
    setErrors({ ...errors, [fieldName]: "" });
  };

  /** Utility function to handle setting input fields value and resetting its error */
  const setFieldValue = (
    text: string,
    fieldName: keyof NewProjectInputTypes
  ): void => {
    setValues({
      ...values,
      [fieldName]: text,
    });
    resetError(fieldName);
  };

  /** Utility function to return `Text` component for showing errors, based on passed input field name */
  const getErrorText = (
    errorFieldName: keyof NewProjectInputTypes
  ): JSX.Element | null => {
    return errors[errorFieldName] ? (
      <Text style={tw`text-sm text-red-700 ml-1 mb-2`}>
        {"> " + errors[errorFieldName]}
      </Text>
    ) : null;
  };

  /** Function to handle when user wants to add more task after project creation */
  const handleAddMoreTask = React.useCallback(() => {
    navigation.replace("NewProjectTask", {
      projectId: newlyCreatedProject.current?.projectId as string,
    });
  }, []);

  const goToProjectsScreen = React.useCallback(() => {
    navigation.navigate("Projects");
  }, []);

  return (
    <SafeArea>
      <TextInputField
        fieldTitle="What would you call this project?"
        placeholder="Project Name"
        fieldTitleIcon="construct"
        containerStyle={tw`mt-4`}
        value={values.projectName}
        onChangeText={(text) => {
          setFieldValue(text, "projectName");
        }}
      />
      {getErrorText("projectName")}

      <TextInputField
        fieldTitle="How would you pitch this project idea?"
        placeholder="Project Description"
        fieldTitleIcon="text"
        value={values.projectDesc}
        onChangeText={(text) => {
          setFieldValue(text, "projectDesc");
        }}
      />
      {getErrorText("projectDesc")}

      <Text style={tw`text-center my-3 font-bold`}>
        Set an initial task for this project?
      </Text>

      <TextInputField
        value={values.initialTask}
        fieldTitle="First task"
        fieldTitleIcon="construct"
        placeholder="What do you need to do first?"
        onChangeText={(text) => {
          setFieldValue(text, "initialTask");
        }}
      />
      {getErrorText("initialTask")}

      <Button
        title="Create Project"
        onPress={validateForm}
        iconName="checkmark"
        containerStyle={tw`mt-6 w-52 mx-auto`}
        showShadow
      />
    </SafeArea>
  );
};

export default withTile(NewProject);
