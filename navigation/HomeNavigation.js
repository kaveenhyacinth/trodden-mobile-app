import React from "react";
import {
  createStackNavigator,
  TransitionPreset,
  TransitionPresets,
} from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import HomeScreen from "../screens/core/HomeScreen";
import NewPostScreen from "../screens/views/NewPostScreen";
import ProfileUser from "../screens/views/ProfileUser";

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
    elevation: 1,
    shadowOpacity: 1,
  },
  headerTitleStyle: {
    fontFamily: Typography.displayHeavy.fontFamily,
    letterSpacing: Typography.displayHeavy.letterSpacing,
  },
  headerTintColor: Colors.info,
};

const HomeNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen
        name="trodden"
        component={HomeScreen}
        options={{
          title: "Trodden",
          headerTitleStyle: { ...Typography.trodden, fontSize: 30 },
          headerTintColor: Colors.primary,
        }}
      />
      <Stack.Screen
        name="newMemo"
        component={NewPostScreen}
        options={{
          title: "New Memory",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileUser}
        options={{
          title: "...",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
