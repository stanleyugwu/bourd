import * as React from "react";
import tw from "../library/tailwind";
import Text from "../components/Text";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { Ionicons as Icon } from "@expo/vector-icons";
import ProjectCard from "../components/ProjectCard";
import withTile from "../components/HOC/withTile";
import { RootState } from "../store";
import { Project, ScreensNavigationParams } from "../../types";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";

/** Displays projects in cards in a list format */
const Projects = ({
  navigation,
}: StackScreenProps<ScreensNavigationParams, "Projects">):JSX.Element => {
  const projects: Project[] = useSelector((state: RootState) => state.projects);

  const handleProjectSelect = React.useCallback((projectId: string): void => {
    navigation.navigate("Project", { projectId });
  }, []);

  const handleCreateNewProject = React.useCallback(() => {
    navigation.navigate("NewProject");
  }, []);

  // Handle empty projects
  if (projects.length === 0) {
    return (
      <SafeAreaView style={tw`my-auto px-8`}>
        <Icon
          name="sad"
          size={70}
          color={tw.color("yellow-500")}
          style={tw`text-center`}
        />
        <Text style={tw`text-center my-5`}>
          No Project found, click below to start a new project
        </Text>
        <Button
          title="Create new project"
          onPress={handleCreateNewProject}
          iconName={"md-add-sharp"}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView
        style={{ height: "90%" }}
        contentContainerStyle={{ padding: 10, paddingBottom: 25 }}
      >
        {projects.map((project) => {
          let doneTasks: number = project.projectTasks.filter(
            (task) => task.taskStatus === "done"
          ).length;
          return (
            <ProjectCard
              key={project.projectId}
              projectId={project.projectId}
              numberOfTasks={project.projectTasks.length}
              onPress={() => handleProjectSelect(project.projectId)}
              numberOfCompletedTasks={doneTasks}
              projectTitle={project.projectName}
              creationDate={project.createdAt}
              projectDescription={project.projectDescription}
            />
          );
        })}
      </ScrollView>
      <View
        style={[
          { height: "10%" },
          tw`bg-primary p-3 justify-center items-center flex-row`,
        ]}
      >
        <TouchableHighlight
          style={tw.style(
            `bg-primary rounded-full mb-12 justify-center items-center content-center mx-16`,
            { height: 75, width: 75, borderWidth: 3, borderColor: "#eee" }
          )}
          onPress={handleCreateNewProject}
          activeOpacity={0.7}
        >
          <Icon
            name="add-sharp"
            style={tw`text-accent self-center p-0 m-0`}
            size={50}
          />
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default withTile(Projects, 2);
