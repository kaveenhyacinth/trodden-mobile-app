import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import CaravansExplore from "../screens/views/CaravansExploreScreen";
import InboxScreen from "../screens/core/InboxScreen";
import ProfileUser from "../screens/views/ProfileUser";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

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

const defaultTabOptions = {
  activeTintColor: Colors.primary,
  inactiveTintColor: Colors.outline,
  labelStyle: { fontFamily: Typography.title.fontFamily },
  tabStyle: { backgroundColor: Colors.accent },
};

const InboxNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        ...defaultTabOptions,
      }}
    >
      <Tab.Screen
        name="nomadsExplore"
        component={InboxScreen}
        options={{
          title: "Invitations",
        }}
      />
      <Tab.Screen
        name="caravansExplore"
        component={CaravansExplore}
        options={{
          title: "Caravans",
        }}
      />
    </Tab.Navigator>
  );
};

const InboxStack = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen name="Inbox" component={InboxNavigator} />
      <Stack.Screen
        name="Profile"
        component={ProfileUser}
        options={{ title: "..." }}
      />
    </Stack.Navigator>
  );
};

export default InboxStack;
