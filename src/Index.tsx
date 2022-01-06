import "react-native-gesture-handler";
import React from "react";
import { registerRootComponent } from "expo";

//redux store resources
import { Provider } from "react-redux";
import store from "./store";
import { Persistor, persistStore } from "redux-persist";

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
import ProjectScreen from "./screens/Project";
import EditProjectScreen from "./screens/EditProject";
import EditProjectTaskScreen from "./screens/EditProjectTask";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator } from "react-native";

const Stack = createStackNavigator<ScreensNavigationParams>();

// A persistor for redux store
const storePersistor: Persistor = persistStore(store);

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
    close: { animation: "spring", config: { friction: 10, tension: 40 } },
    open: { animation: "spring", config: { friction: 10, tension: 40 } },
  },
  // animation: "slide_from_right",
  // statusBarStyle: "light",
};

const Loader: JSX.Element = (
  <ActivityIndicator
    animating
    size={50}
    style={{
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginVertical: "auto",
      marginHorizontal: "auto",
    }}
  />
);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={storePersistor} loading={Loader}>
        <NavigationContainer theme={appTheme}>
          <Stack.Navigator screenOptions={navigatorScreenOptions}>
            <Stack.Screen name="Projects" component={ProjectsScreen} />
            <Stack.Screen
              name="NewProject"
              component={NewProjectScreen}
              options={{ headerTitle: "Create New Project" }}
            />
            <Stack.Screen
              name="NewProjectTask"
              component={NewProjectTaskScreen}
              options={{ headerTitle: "Create Project Task" }}
            />
            <Stack.Screen name="Project" component={ProjectScreen} />
            <Stack.Screen name="EditProject" component={EditProjectScreen} />
            <Stack.Screen
              name="EditProjectTask"
              component={EditProjectTaskScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

registerRootComponent(App);
