import "react-native-gesture-handler";
import React from "react";
import { registerRootComponent } from "expo";

//redux store resources
import {Provider} from 'react-redux';
import store from "./store";

//navgation helpers
import { NavigationContainer, Theme } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

//libraries and screens
import tw from "./library/tailwind";
import Projects from "./screens/Projects";

const Stack = createStackNavigator();

const appTheme:Theme = {
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

const navigatorScreenOptions:StackNavigationOptions = {
  headerTitleStyle: tw`text-white`,
  headerTintColor: tw.color("accent"),
  animationTypeForReplace: "push",
  animationEnabled: true,
  // animation: "slide_from_right",
  // statusBarStyle: "light",
};

function App():JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator screenOptions={navigatorScreenOptions}>
          <Stack.Screen name="Projects" component={Projects} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
