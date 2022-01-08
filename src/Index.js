"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
require("react-native-gesture-handler");
var React = require("react");
var expo_1 = require("expo");
//redux store resources
var react_redux_1 = require("react-redux");
var store_1 = require("./store");
var redux_persist_1 = require("redux-persist");
//navgation helpers
var native_1 = require("@react-navigation/native");
var stack_1 = require("@react-navigation/stack");
//libraries and screens
var tailwind_1 = require("./library/tailwind");
var Projects_1 = require("./screens/Projects");
var NewProject_1 = require("./screens/NewProject");
var NewProjectTask_1 = require("./screens/NewProjectTask");
var Project_1 = require("./screens/Project");
var EditProject_1 = require("./screens/EditProject");
var EditProjectTask_1 = require("./screens/EditProjectTask");
var react_2 = require("redux-persist/integration/react");
var react_native_1 = require("react-native");
var Stack = (0, stack_1.createStackNavigator)();
// A persistor for redux store
var storePersistor = (0, redux_persist_1.persistStore)(store_1["default"]);
var appTheme = {
    colors: {
        background: "#f6f6f6",
        border: "#121330",
        card: "#121330",
        notification: "rgb(255, 59, 48)",
        primary: "#121330",
        text: "#444444"
    },
    dark: false
};
var navigatorScreenOptions = {
    headerTitleStyle: (0, tailwind_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["text-white"], ["text-white"]))),
    headerTintColor: tailwind_1["default"].color("accent"),
    animationTypeForReplace: "pop",
    animationEnabled: true,
    transitionSpec: {
        close: { animation: "spring", config: { friction: 10, tension: 40 } },
        open: { animation: "spring", config: { friction: 10, tension: 40 } }
    }
};
var Loader = (<react_native_1.ActivityIndicator animating size={50} style={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: "auto",
        marginHorizontal: "auto"
    }}/>);
function App() {
    return (<react_redux_1.Provider store={store_1["default"]}>
      <react_2.PersistGate persistor={storePersistor} loading={Loader}>
        <native_1.NavigationContainer theme={appTheme}>
          <Stack.Navigator screenOptions={navigatorScreenOptions}>
            <Stack.Screen name="Projects" component={Projects_1["default"]}/>
            <Stack.Screen name="NewProject" component={NewProject_1["default"]} options={{ headerTitle: "Create New Project" }}/>
            <Stack.Screen name="NewProjectTask" component={NewProjectTask_1["default"]} options={{ headerTitle: "Create Project Task" }}/>
            <Stack.Screen name="Project" component={Project_1["default"]}/>
            <Stack.Screen name="EditProject" component={EditProject_1["default"]}/>
            <Stack.Screen name="EditProjectTask" component={EditProjectTask_1["default"]}/>
          </Stack.Navigator>
        </native_1.NavigationContainer>
      </react_2.PersistGate>
    </react_redux_1.Provider>);
}
(0, expo_1.registerRootComponent)(App);
var templateObject_1;
