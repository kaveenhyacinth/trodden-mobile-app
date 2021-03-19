import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import NomadProfAboutView from "../screens/views/NomadProfAboutView";
import CaravansExplore from "../screens/views/CaravansExploreScreen";
import TimelineScreen from "../screens/views/TimelineScreen";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const renderFaIcons = (tabInfo) => (name, size) => (
  <FontAwesome5 name={name} size={size} color={tabInfo.color} />
);

const defaultTabOptions = {
  activeTintColor: Colors.primary,
  inactiveTintColor: Colors.outline,
  labelStyle: { fontFamily: Typography.title },
  tabStyle: { backgroundColor: Colors.accent },
  showIcon: true,
  showLabel: false,
};

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

const nomadProfileNavigation = (props) => {
  const renderProfile = () => (
    <NomadProfAboutView navigation={props.navigation} type="non-self" />
  );

  const renderTimeline = () => <TimelineScreen type="non-self" />;

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

export default nomadProfileNavigation;
