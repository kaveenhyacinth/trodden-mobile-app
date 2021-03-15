import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import NomadsExplore from "../screens/views/NomadsExploreScreen";
import CaravansExplore from "../screens/views/CaravansExploreScreen";
import BlazeScreen from "../screens/views/BlazesScreen";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
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
      <Stack.Screen name="Tribe" component={ExploreNavigator} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
