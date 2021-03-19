import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import TimelineScreen from "../screens/views/TimelineScreen";
import CaravansExplore from "../screens/views/CaravansExploreScreen";
import NomadAboutProfileView from "../screens/views/NomadProfAboutView";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import NomadProfileNavigation from "./NomadProfileNavigation";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const renderFaIcons = (tabInfo) => (name, size) => (
  <FontAwesome5 name={name} size={size} color={tabInfo.color} />
);

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
  labelStyle: { fontFamily: Typography.title },
  tabStyle: { backgroundColor: Colors.accent },
  showIcon: true,
  showLabel: false,
};

const OwnProfileTabNavigation = (props) => {
  const renderProfile = () => (
    <NomadAboutProfileView navigation={props.navigation} type="self" />
  );

  const renderTimeline = () => <TimelineScreen type="self" />;

  return (
    <Tab.Navigator
      tabBarOptions={{
        ...defaultTabOptions,
      }}
      swipeEnabled={false}
    >
      <Tab.Screen
        name="nomads"
        component={renderProfile}
        options={{
          title: "Settings",
          tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("user-alt", 20),
        }}
      />
      <Tab.Screen
        name="timeline"
        component={renderTimeline}
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
    </Tab.Navigator>
  );
};

const OwnProfileStackNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen name="Nomad" component={OwnProfileTabNavigation} />
      <Stack.Screen
        name="Profile"
        component={NomadProfileNavigation}
        options={{ title: "..." }}
      />
    </Stack.Navigator>
  );
};

export default OwnProfileStackNavigation;
