import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigator from "./AuthNavigator";
import PostAuthNavigator from "./PostAuthNavigator";
import CoreNavigator from "./CoreNavigator"

const Stack = createStackNavigator();

const MainNavigator = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="postAuth" component={PostAuthNavigator} />
      <Stack.Screen name="core" component={CoreNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
