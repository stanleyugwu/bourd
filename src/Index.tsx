import "react-native-gesture-handler";
import React from "react";
import { registerRootComponent } from "expo";

//redux store resources
import { Provider } from "react-redux";
import store from "./store";

//navgation helpers
import { NavigationContainer, Theme } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

//libraries and screens
import tw from "./library/tailwind";
import ProjectsScreen from "./screens/Projects";
import NewProjectScreen from "./screens/NewProject";
import NewProjectTaskScreen from "./screens/NewProjectTask";
import { ScreensNavigationParams } from "../types";

const Stack = createStackNavigator<ScreensNavigationParams>();

const appTheme: Theme = {
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

const navigatorScreenOptions: StackNavigationOptions = {
  headerTitleStyle: tw`text-white`,
  headerTintColor: tw.color("accent"),
  animationTypeForReplace: "pop",
  animationEnabled: true,
  transitionSpec: {
    close: { animation: "spring", config: { friction: 10, tension:40 } },
    open: { animation: "spring", config: { friction: 10, tension:40 } },
  },
  // animation: "slide_from_right",
  // statusBarStyle: "light",
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator screenOptions={navigatorScreenOptions}>
          <Stack.Screen name="Projects" component={ProjectsScreen} />
          <Stack.Screen name="NewProject" component={NewProjectScreen} options={{headerTitle:"Create New Project"}}/>
          <Stack.Screen name="NewProjectTask" component={NewProjectTaskScreen} options={{headerTitle:"Create Project Task"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
