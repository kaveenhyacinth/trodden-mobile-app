import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import PostAuthNavigator from "./PostAuthNavigator";
import CoreNavigator from "./CoreNavigator";
import LoadingScreen from "../screens/info/LoadingScreen";

const Stack = createStackNavigator();

const MainNavigator = ({ isUser }) => {
  return isUser ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="core" component={CoreNavigator} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="postAuth" component={PostAuthNavigator} />
      <Stack.Screen name="core" component={CoreNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
