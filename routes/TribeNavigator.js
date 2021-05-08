import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import CaravansListScreen from "../screens/tribe/CaravansListScreen";
import BlazesListScreen from "../screens/tribe/BlazesListScreen";
import NomadScreen from "../screens/tribe/NomadsScreen";
import ProfileUser from "../screens/profile/ProfileUser";
import CreateCaravan from "../screens/create/CreateCaravanScreen";
import CaravanScreen from "../screens/tribe/CaravanScreen";
import ChatScreen from "../screens/tribe/ChatScreen";
import CaravanNomadsScreen from "../screens/tribe/CaravanNomadsScreen";
import CreateBlazeScreen from "../screens/create/CreateBlazeScreen";
import BlazeScreen from "../screens/tribe/BlazeScreen";
import TripScreen from "../screens/profile/TripScreen";

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

const TribeTabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        ...DEFAULT_TAB_NAVIGATION_OPTIONS,
      }}
    >
      <Tab.Screen
        name="blazes"
        component={BlazesListScreen}
        options={{
          title: "Blazes",
        }}
      />
      <Tab.Screen
        name="caravans"
        component={CaravansListScreen}
        options={{
          title: "Caravans",
        }}
      />
      <Tab.Screen
        name="nomads"
        component={NomadScreen}
        options={{
          title: "Nomads",
        }}
      />
    </Tab.Navigator>
  );
};

const TribeStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...DEFAULT_STACK_NAVIGATION_OPTIONS }}>
      <Stack.Screen name="Tribe" component={TribeTabNavigator} />
      <Stack.Screen
        name="Profile"
        component={ProfileUser}
        options={{ title: "..." }}
      />
      <Stack.Screen
        name="NewCaravan"
        component={CreateCaravan}
        options={{
          title: "New Caravan",
        }}
      />
      <Stack.Screen
        name="Caravan"
        component={CaravanScreen}
        options={{
          title: "...",
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: "...",
        }}
      />
      <Stack.Screen
        name="CaravanNomads"
        component={CaravanNomadsScreen}
        options={{
          title: "Nomads",
        }}
      />
      <Stack.Screen
        name="NewBlaze"
        component={CreateBlazeScreen}
        options={{
          title: "New Blaze",
        }}
      />
      <Stack.Screen
        name="Blaze"
        component={BlazeScreen}
        options={{
          title: "...",
        }}
      />
      <Stack.Screen
        name="Trip"
        component={TripScreen}
        options={{
          title: "...",
        }}
      />
    </Stack.Navigator>
  );
};

export default TribeStackNavigator;
