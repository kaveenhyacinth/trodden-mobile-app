import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import CaravanScreen from "../screens/tribe/CaravanScreen";
import BlazeScreen from "../screens/tribe/BlazesScreen";
import NomadScreen from "../screens/tribe/NomadsScreen";
import ProfileUser from "../screens/profile/ProfileUser";
import CreateCaravan from "../screens/create/CreateCaravanScreen";

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
        component={BlazeScreen}
        options={{
          title: "Blazes",
        }}
      />
      <Tab.Screen
        name="caravans"
        component={CaravanScreen}
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
    </Stack.Navigator>
  );
};

export default TribeStackNavigator;
