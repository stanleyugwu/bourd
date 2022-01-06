import * as React from "react";
import { StyleSheet, View, Platform, ViewStyle, ViewProps } from "react-native";

/**
 * A HOC that adds `box-shadow` around passed component
 * @param {React.FunctionComponent | React.ComponentClass} Component Component to wrap
 * @param {ViewStyle} style Style to apply to parent `View`
 */

const withBoxShadow = <ComponentProps extends object>(
  Component: React.FC<ComponentProps> | React.ComponentClass<ComponentProps>,
  style?: ViewStyle
): React.NamedExoticComponent<ComponentProps> =>
  React.memo((props) => (
    <View
      style={[styles.boxShadow, { backgroundColor: "white" }, style]}
      accessibilityLabel="box-shadow wrapper"
    >
      <Component {...(props as ComponentProps)} />
    </View>
  ));

/** Component, non-HOC version of `withBoxShadow` */
const BoxShadow = ({style, children, accessibilityLabel = "box-shadow wrapper"}: ViewProps): JSX.Element => (
  <View
    style={[
      styles.boxShadow,
      { backgroundColor: "white" },
      style,
    ]}
    accessibilityLabel={accessibilityLabel}
  >
    {children}
  </View>
);

export const styles = StyleSheet.create({
  boxShadow:
    Platform.OS == "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }
      : {
          elevation: 3,
        },
});

export {withBoxShadow as default, BoxShadow};
