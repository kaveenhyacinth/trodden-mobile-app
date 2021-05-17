import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import InRequestsScreen from "../screens/inbox/InRequestsScreen";
import ProfileUser from "../screens/profile/ProfileUser";
import HashTagScreen from "../screens/home/HashTagScreen";
import LocationBlazeScreen from "../screens/home/LocationScreen";
import BlazeScreen from "../screens/tribe/BlazeScreen";

const Stack = createStackNavigator();

const DEFAULT_STACK_NAVIGATION_OPTIONS = {
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

const InboxStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...DEFAULT_STACK_NAVIGATION_OPTIONS }}>
      <Stack.Screen
        name="inReqs"
        component={InRequestsScreen}
        options={{
          title: "Invitations",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileUser}
        options={{ title: "..." }}
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

export default InboxStackNavigator;
