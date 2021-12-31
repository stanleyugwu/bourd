import React from "react";
import {
  GestureResponderEvent,
  ViewStyle,
  TouchableHighlight,
  View,
  ColorValue,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { IoniconName } from "@expo/vector-icons/build/Ionicons";
import Text from "./Text";
import tw from "../library/tailwind";
import { BoxShadow } from "./HOC/withBoxShadow";

export type ButtonProps = {
  /** Button label text */
  title: string;
  /** Callback to be called when button is pressed */
  onPress: (event: GestureResponderEvent) => void;
  /** Custom accessbility text for button */
  accessibilityLabel?: string;
  /** Name of `Ionicons` icon to display */
  iconName?: IoniconName;
  /** Whether to wrap componnt in box-shadow */
  showShadow?: boolean;
  /** Whether to place icon left or right to button label */
  iconPosition?: "left" | "right";
  /** Button background color */
  bgColor?: ColorValue;
  /** Color of button label text */
  labelColor?: ColorValue;
  /** Style for parent `TouchableHiglight` */
  containerStyle?: ViewStyle;
};

/**
 * Renders a customizable button
 */
const Button = ({
  title,
  onPress,
  containerStyle,
  iconName,
  showShadow = true,
  accessibilityLabel = "pressable button",
  iconPosition = "left",
  bgColor = tw.color("primary"),
  labelColor = tw.color("accent"),
}: ButtonProps): JSX.Element => {
  let icon = iconName ? (
    <Icon
      name={iconName}
      size={23}
      color={labelColor}
      accessibilityLabel="button icon"
    />
  ) : null;

  /** Main `TouchableHighlight` component */
  const innerComponent = (
    <TouchableHighlight
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.7}
      onPress={onPress}
      style={tw.style(`rounded-md`)}
    >
      <View
        style={tw.style(
          { backgroundColor: bgColor as string },
          `flex-row rounded-md max-w-md items-center p-2.5 h-12 justify-center`
        )}
      >
        {iconPosition == "left" ? icon : null}
        <Text
          style={{
            color: labelColor,
            textAlign: "center",
            paddingHorizontal: 12,
          }}
          accessibilityLabel="button text"
        >
          {title}
        </Text>
        {iconPosition == "right" ? icon : null}
      </View>
    </TouchableHighlight>
  );

  return showShadow ? (
    <BoxShadow accessibilityLabel={accessibilityLabel} style={containerStyle}>
      {innerComponent}
    </BoxShadow>
  ) : (
    <View style={containerStyle} accessibilityLabel={accessibilityLabel}>
      {innerComponent}
    </View>
  );
};

export default React.memo(Button);
