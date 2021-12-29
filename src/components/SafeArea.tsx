import * as React from "react";
import { ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

/**
 * Wraps children in `<SafeAreaView/>` with additional padding
 * @param {SafeAreaViewProps} props
 */
const SafeArea = ({ children, style, ...rest }:SafeAreaViewProps & ViewProps):JSX.Element => {
  return (
    <SafeAreaView
      style={[{ padding:5 }, style]}
      accessibilityLabel="screen wrapper"
      {...rest}
    >
      <ScrollView contentContainerStyle={{padding:5}}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SafeArea;
