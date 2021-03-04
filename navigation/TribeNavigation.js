import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import NomadsExplore from "../screens/misc/NomadsExploreScreen";
import CaravansExplore from "../screens/misc/CaravansExploreScreen";
import BlazeScreen from "../screens/misc/BlazesScreen";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTitleStyle: {
    fontFamily: "comfortaa-bold",
  },
};

const defaultTabOptions = {
  activeTintColor: Colors.primary,
  inactiveTintColor: Colors.outline,
  labelStyle: { fontFamily: "comfortaa-bold" },
  tabStyle: { backgroundColor: Colors.accent },
};

const ExploreNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        ...defaultTabOptions,
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
        component={CaravansExplore}
        options={{
          title: "Caravans",
        }}
      />
      <Tab.Screen
        name="nomads"
        component={NomadsExplore}
        options={{
          title: "Nomads",
        }}
      />
    </Tab.Navigator>
  );
};

const ExploreStack = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen name="Explore" component={ExploreNavigator} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
