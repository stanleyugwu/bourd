import React from "react";
import { Text as _Text, TextProps } from "react-native";
import tw from "../library/tailwind";

/**
 * Renders text just like native `Text` component, but with some pre-defined styles
 * @param {TextProps} props
 */
const Text = (props) => {
  const { style, ...others } = props;
  return (
    <_Text
      accessibilityRole="text"
      style={tw.style(`text-black text-base`, style)}
      {...others}
    />
  );
};

export default Text;
