import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../theme/Colors";
import AuthNavigator from "./AuthNavigator";
import PostAuthNavigator from "./PostAuthNavigator";

const Stack = createStackNavigator();

const MainNavigator = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="postAuth" component={PostAuthNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
