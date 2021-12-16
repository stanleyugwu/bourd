import "react-native-gesture-handler";
import React from "react";
import { Text, View } from "react-native";
import { registerRootComponent } from "expo";
import {
  NavigationContainer,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import tw from "./library/tailwind";

const Stack = createStackNavigator();
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

function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Text onPress={() => navigation.navigate("Login")}>HOME</Text>
    </View>
  );
}
function Login() {
  const navigation = useNavigation();
  console.log(navigation.getState());
  console.log(useTheme());
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={navigatorScreenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
