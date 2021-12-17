import React from "react";
import { ScrollView } from "react-native-gesture-handler";
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
      style={[{ padding:5 }, style]}
      accessibilityLabel="screen wrapper"
      {...others}
    >
      <ScrollView contentContainerStyle={{padding:5}}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SafeArea;
