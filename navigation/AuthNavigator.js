import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OpenScreen from "../screens/OpenScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DetailsScreen from "../screens/DetailsScreen";
import Colors from "../theme/Colors";

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTitleStyle: {
    fontFamily: "comfortaa-bold",
  },
};

const AuthNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen
        name="OpenScreen"
        component={OpenScreen}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="signIn"
        component={SignInScreen}
        options={{
          title: "Sign In",
        }}
      />
      <Stack.Screen
        name="details"
        component={DetailsScreen}
        options={{
          title: "About You",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
