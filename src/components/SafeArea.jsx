import React from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

/**
 * Wraps children in `<SafeAreaView/>` with additional padding
 * @param {SafeAreaViewProps} props
 */
const SafeArea = (props) => {
  const { children, style, others } = props;
  return (
    <SafeAreaView
      style={[{ padding:10 }, style]}
      accessibilityLabel="screen wrapper"
      {...others}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
