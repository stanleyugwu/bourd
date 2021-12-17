import React from "react";
import { StyleSheet, View, Platform, ViewStyle } from "react-native";

/**
 * A HOC that adds `box-shadow` around passed component
 * @param {import('react').ReactComponentElement} Component Component to wrap
 * @param {ViewStyle} style Style to apply to parent `View`
 */
const withBoxShadow = (Component, style = null) => {
  return React.memo((props) => (
    <View
      style={[styles.boxShadow, { backgroundColor: "white" }, style]}
      accessibilityLabel="box-shadow wrapper"
    >
      <Component {...props} />
    </View>
  ));
};

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

export default withBoxShadow;
