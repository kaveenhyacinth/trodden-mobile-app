import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ProfileOwn from "../screens/views/ProfileOwn";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontFamily: Typography.displayHeavy.fontFamily,
    letterSpacing: Typography.displayHeavy.letterSpacing,
  },
  headerTintColor: Colors.info,
};

const OwnProfileStackNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen name="Nomad" component={ProfileOwn} />

      <Stack.Screen
        name="Profile"
        component={ProfileOwn}
        options={{ title: "..." }}
      />
    </Stack.Navigator>
  );
};

export default OwnProfileStackNavigation;
