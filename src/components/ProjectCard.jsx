import React from "react";
import { View, GestureResponderEvent, ViewStyle } from "react-native";
import Text, { Title } from "./Text";
import tw from "../library/tailwind";
import PropTypes from "prop-types";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import withBoxShadow from "./HOC/withBoxShadow";
import { Ionicons as Icon } from "@expo/vector-icons";

/**
 * @typedef {Object} ProjectCardProps
 * @property {number} numberOfTasks Number of tasks the project has
 * @property {number} numberOfCompletedTasks Number of tasks completed for the project
 * @property {string} projectTitle Title text to show as project name
 * @property {string} projectDescription Project's description text
 * @property {number} creationDate Timestamp representing the date the project was created
 * @property {ViewStyle} [containerStyle] Style for parent `View`
 * @property {(event: GestureResponderEvent) => void} onPress Callback to be called when the card is pressed
 */

/**
 * Renders a pressable UI card that represents a project
 * @param {ProjectCardProps} props
 */
let ProjectCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.9} style={tw.style(`max-w-md rounded-md`, props.containerStyle)} >
      <View style={tw.style(`pb-2`, props.containerStyle)}>
        <View
          style={tw`bg-primary rounded-t-md py-1 px-3 justify-between flex-row overflow-visible`}
        >
          <Text style={tw`text-gray-300 font-bold text-sm`}>
            Tasks: {props.numberOfTasks}
          </Text>
          <Text style={tw`text-gray-300 font-bold text-sm`}>
            Completed: {props.numberOfCompletedTasks}
          </Text>
          <Text style={tw`text-gray-300 font-bold text-sm items-center`}>
            <Icon name="time-outline" size={19}/> {new Date(props.creationDate).toLocaleDateString()}
          </Text>
        </View>

        <ScrollView style={tw`h-28 px-3 mt-3`} contentInset={{ bottom: 20 }}>
          <Title>{props.projectTitle}</Title>
          <Text style={tw`overflow-visible`}>{props.projectDescription}</Text>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

ProjectCard = withBoxShadow(ProjectCard, tw`my-3 rounded-md`);

ProjectCard.propTypes = {
  numberOfTasks: PropTypes.number.isRequired,
  numberOfCompletedTasks: PropTypes.number.isRequired,
  projectTitle: PropTypes.string.isRequired,
  projectDescription: PropTypes.string.isRequired,
  creationDate: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

ProjectCard.defaultProps = {
  projectTitle: "Unknown Project",
  projectDescription: "No description",
  creationDate: Date.now(),
};

export default React.memo(ProjectCard);
