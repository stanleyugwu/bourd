import * as React from "react";
import { View, GestureResponderEvent, ViewStyle } from "react-native";
import Text, { Title } from "./Text";
import tw from "../library/tailwind";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import withBoxShadow from "./HOC/withBoxShadow";
import { Ionicons as Icon } from "@expo/vector-icons";
import { ClassInput } from "tailwind-react-native-classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LooseDate } from "../../types";

// Extend dayjs module to add time-ago functionality like `few seconds ago`
dayjs.extend(relativeTime);

export type ProjectCardProps = {
  /** Number of tasks the project has */
  numberOfTasks: number;
  /** Unique `Id` of the project */
  projectId:string;
  /** Number of tasks completed for the project */
  numberOfCompletedTasks: number;
  /** Title text to show as project name */
  projectTitle: string;
  /** Timestamp representing the date the project was created */
  creationDate: LooseDate;
  /** Callback to be called when the card is pressed */
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
  /** Project's description text */
  projectDescription?: string;
  /** Style for parent `View` */
  containerStyle?: ViewStyle;
};

/**
 * Renders a pressable UI card that represents a project
 */
let ProjectCard = ({
  numberOfTasks,
  projectId,
  numberOfCompletedTasks,
  projectTitle,
  creationDate,
  onPress,
  projectDescription = "no description",
  containerStyle,
}: ProjectCardProps): JSX.Element => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    style={tw.style(`max-w-md rounded-md`, containerStyle as ClassInput)}
    nativeID={projectId}
  >
    <View style={tw.style(`pb-2`, containerStyle as ClassInput)}>
      <View
        style={tw`bg-primary rounded-t-md py-1 px-3 justify-between flex-row overflow-visible`}
      >
        <Text style={tw`text-gray-300 text-sm`}>Tasks: {numberOfTasks}</Text>
        <Text style={tw`text-gray-300 text-sm `}>
          Done: {numberOfCompletedTasks}
        </Text>
        <View style={tw`flex-row`}>
          <Icon name="time-outline" size={19} color={tw.color("gray-300")} />
          <Text style={tw`text-gray-300 ml-1 text-sm items-center`}>
            {dayjs(creationDate).fromNow()}
          </Text>
        </View>
      </View>

      <ScrollView style={tw`h-28 px-3 mt-3`} contentInset={{ bottom: 20 }}>
        <Title>{projectTitle}</Title>
        <Text style={tw`overflow-visible`}>{projectDescription}</Text>
      </ScrollView>
    </View>
  </TouchableOpacity>
);

export default withBoxShadow<ProjectCardProps>(
  ProjectCard,
  tw`my-3 rounded-md`
);
