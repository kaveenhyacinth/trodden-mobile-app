import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import OutRequestsScreen from "../screens/inbox/OutRequestsScreen";
import InRequestsScreen from "../screens/inbox/InRequestsScreen";
import ProfileUser from "../screens/profile/ProfileUser";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

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

const DEFAULT_TAB_NAVIGATION_OPTIONS = {
  activeTintColor: Colors.primary,
  inactiveTintColor: Colors.outline,
  labelStyle: { fontFamily: Typography.title.fontFamily },
  tabStyle: { backgroundColor: Colors.accent },
};

const InboxTabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        ...DEFAULT_TAB_NAVIGATION_OPTIONS,
      }}
    >
      <Tab.Screen
        name="inReqs"
        component={InRequestsScreen}
        options={{
          title: "Invitations",
        }}
      />
      <Tab.Screen
        name="outReqs"
        component={OutRequestsScreen}
        options={{
          title: "Pending...",
        }}
      />
    </Tab.Navigator>
  );
};

const InboxStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...DEFAULT_STACK_NAVIGATION_OPTIONS }}>
      <Stack.Screen name="Inbox" component={InboxTabNavigator} />
      <Stack.Screen
        name="Profile"
        component={ProfileUser}
        options={{ title: "..." }}
      />
    </Stack.Navigator>
  );
};

export default InboxStackNavigator;
