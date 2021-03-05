import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import HomeScreen from "../screens/core/HomeScreen";

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
    // elevation: 5,
    // shadowOpacity: 0,
  },
  headerTitleStyle: {
    ...Typography.trodden,
    fontSize: 30,
  },
  headerTintColor: Colors.primary,
};

const HomeNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen name="Trodden" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
