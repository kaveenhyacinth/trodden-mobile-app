import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import HomeScreen from "../screens/home/HomeScreen";
import CreateMemoScreen from "../screens/create/CreateMemoScreen";
import ProfileUser from "../screens/profile/ProfileUser";
import ProfileOwn from "../screens/profile/ProfileOwn";
import MapScreen from "../screens/home/MapScreen";
import HashTagScreen from "../screens/home/HashTagScreen";
import LocationBlazeScreen from "../screens/home/LocationScreen";
import BlazeScreen from "../screens/tribe/BlazeScreen";

const Stack = createStackNavigator();

const DEFAULT_STACK_NAVIGATION_OPTIONS = {
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

const HomeStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...DEFAULT_STACK_NAVIGATION_OPTIONS }}>
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
        component={CreateMemoScreen}
        options={{
          title: "Create New Memory",
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
      <Stack.Screen
        name="profileOwn"
        component={ProfileOwn}
        options={{
          title: "...",
        }}
      />
      <Stack.Screen
        name="map"
        component={MapScreen}
        options={{
          title: "Nearby Map",
        }}
      />
      <Stack.Screen
        name="tagFeed"
        component={HashTagScreen}
        options={{
          title: "...",
        }}
      />
      <Stack.Screen
        name="locationBlazes"
        component={LocationBlazeScreen}
        options={{
          title: "...",
        }}
      />
      <Stack.Screen
        name="Blaze"
        component={BlazeScreen}
        options={{
          title: "...",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
