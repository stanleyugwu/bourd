import React from "react";
import {
  GestureResponderEvent,
  ViewStyle,
  TouchableHighlight,
  View,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import Text from "./Text";
import tw from "../library/tailwind";
import PropTypes from "prop-types";

/**
 * @typedef {Object} ButtonProps
 * @property {string} title Button label text
 * @property {string} accessibilityLabel Custom accessbility text for button
 * @property {string} iconName Name of `Ionicons` icon to display
 * @property {"left" | "right"} iconPosition Whether to place icon left or right to button label
 * @property {(event:GestureResponderEvent) => void} onPress Callback to be called when button is pressed
 * @property {string} bgColor Button background color
 * @property {string} labelColor Color of button label text
 * @property {ViewStyle} containerStyle Style for parent `TouchableHiglight`
 */

/**
 * Renders a customizable button
 * @param {ButtonProps} props
 */
const Button = (props) => {
  let icon = props.iconName ? (
    <Icon
      name={props.iconName}
      size={23}
      color={props.labelColor}
      accessibilityLabel="button icon"
    />
  ) : null;
  return (
    <TouchableHighlight
      accessibilityLabel={props.accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.7}
      onPress={props.onPress}
      style={tw.style(`rounded-md`, { elevation: 4 })}
    >
      <View
        style={tw.style(
          { backgroundColor: props.bgColor },
          tw`flex-row rounded-md max-w-md items-center p-2.5 h-12 justify-center`,
          props.containerStyle
        )}
      >
        {props.iconPosition == "left" ? icon : null}
        <Text
          style={{
            color: props.labelColor,
            textAlign: "center",
            paddingHorizontal: 12,
          }}
          accessibilityLabel="button text"
        >
          {props.title}
        </Text>
        {props.iconPosition == "right" ? icon : null}
      </View>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  iconName: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  onPress: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  labelColor: PropTypes.string,
  containerStyle: PropTypes.object,
};

Button.defaultProps = {
  title: "Click Me",
  accessibilityLabel: "pressable button",
  iconPosition: "left",
  bgColor: tw.color("primary"),
  labelColor: tw.color("accent"),
};

export default React.memo(Button);
