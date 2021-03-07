import React from "react";
import { ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import NomadsExplore from "../screens/misc/NomadsExploreScreen";
import CaravansExplore from "../screens/misc/CaravansExploreScreen";
import BlazeScreen from "../screens/misc/BlazesScreen";
import ProfileHeader from "../components/ProfileHeader";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const renderFaIcons = (tabInfo) => (name, size) => (
  <FontAwesome5 name={name} size={size} color={tabInfo.color} />
);

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
  labelStyle: { fontFamily: Typography.title },
  tabStyle: { backgroundColor: Colors.accent },
  showIcon: true,
  showLabel: false,
};

const ExploreNavigator = (props) => {
  return (
    <ScrollView>
      <ProfileHeader />
      <Tab.Navigator
        tabBarOptions={{
          ...defaultTabOptions,
        }}
      >
        <Tab.Screen
          name="blazes"
          component={BlazeScreen}
          options={{
            title: "Timeline",
            tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("stream", 20),
          }}
        />
        <Tab.Screen
          name="caravans"
          component={CaravansExplore}
          options={{
            title: "Trips",
            tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("briefcase", 20),
          }}
        />
        {/* <Tab.Screen
          name="nomads"
          component={NomadsExplore}
          options={{
            title: "Settings",
            tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("cog", 20),
          }}
        /> */}
      </Tab.Navigator>
    </ScrollView>
  );
};

const ExploreStack = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen name="Profile" component={ExploreNavigator} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
