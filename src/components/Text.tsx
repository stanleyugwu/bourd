import React from "react";
import { Text as _Text, TextProps } from "react-native";
import { ClassInput } from "tailwind-react-native-classnames";
import tw from "../library/tailwind";

/**
 * Renders text just like native `Text` component, but with some pre-defined styles
 * @param {TextProps} props
 */
const Text = ({ style, ...rest }:TextProps):JSX.Element => {
  return (
    <_Text
      accessibilityRole="text"
      style={tw.style(`text-black text-base`, style as ClassInput)}
      {...rest}
    />
  );
};

/**
 * Renders a titled-text, bigger than `Text` and with pre-defined theming
 */
const Title = ({ style, ...rest }:TextProps):JSX.Element => {
  return (
    <_Text
      accessibilityRole="text"
      style={tw.style(`text-black text-xl`, { fontWeight: "700" }, style as ClassInput)}
      {...rest}
    />
  );
};

export { Text as default, Title };
