import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ProfileHeader from "../../components/ProfileHeader";
import TimelineScreen from "../views/TimelineScreen";
import CaravansExplore from "../views/CaravansExploreScreen";

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

//#region Timeline component
const ProfileScreen = (props) => {
  const renderProfile = () => (
    <ProfileHeader navigation={props.navigation} />
  );

  return (
    <Tab.Navigator
      tabBarOptions={{
        ...defaultTabOptions,
      }}
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
        component={TimelineScreen}
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
//#endregion

export default ProfileScreen;
