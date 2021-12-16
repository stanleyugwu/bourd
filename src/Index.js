import "react-native-gesture-handler";
import React from "react";
import { registerRootComponent } from "expo";

//navgation helpers
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//libraries and screens
import tw from "./library/tailwind";
import Projects from "./screens/Projects";

const Stack = createStackNavigator();

/** @type {Theme} */
const appTheme = {
  colors: {
    background: "#f6f6f6",
    border: "#121330",
    card: "#121330",
    notification: "rgb(255, 59, 48)",
    primary: "#121330",
    text: "#444444",
  },
  dark: false,
};

/** @type {import("@react-navigation/stack").StackNavigationOptions} */
const navigatorScreenOptions = {
  headerTitleStyle: tw`text-white`,
  headerTintColor: tw.color("accent"),
  animationTypeForReplace: "push",
  animationEnabled: true,
  animation: "slide_from_right",
  statusBarStyle: "light",
};

function App() {
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={navigatorScreenOptions}>
        <Stack.Screen name="Projects" component={Projects} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
