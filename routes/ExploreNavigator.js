import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import NomadsExplore from "../screens/explore/NomadsExploreScreen";
import CaravansExplore from "../screens/explore/CaravansExploreScreen";
import CaravanScreen from "../screens/tribe/CaravanScreen";
import SearchView from "../screens/explore/SearchView";
import ProfileUser from "../screens/profile/ProfileUser";
import CaravanNomadsScreen from "../screens/tribe/CaravanNomadsScreen";
import TripScreen from "../screens/profile/TripScreen";
import HashTagScreen from "../screens/home/HashTagScreen";
import BlazeScreen from "../screens/tribe/BlazeScreen";
import LocationBlazeScreen from "../screens/home/LocationScreen";

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

const ExploreTabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        ...DEFAULT_TAB_NAVIGATION_OPTIONS,
      }}
    >
      <Tab.Screen
        name="nomadsExplore"
        component={NomadsExplore}
        options={{
          title: "Nomads",
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

const ExploreStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...DEFAULT_STACK_NAVIGATION_OPTIONS }}>
      <Stack.Screen
        name="Explore"
        component={ExploreTabNavigator}
        options={{ title: "Explore" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileUser}
        options={{ title: "..." }}
      />
      <Stack.Screen
        name="Trip"
        component={TripScreen}
        options={{
          title: "...",
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchView}
        options={{
          title: "Search Trodden",
          ...TransitionPresets.ModalSlideFromBottomIOS,
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
        name="CaravanNomads"
        component={CaravanNomadsScreen}
        options={{
          title: "Nomads",
        }}
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

export default ExploreStackNavigator;
