import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import Home from "./HomeNavigator";
import Explore from "./ExploreNavigator";
import Profile from "./ProfileNavigator";
import Tribe from "./TribeNavigator";
import Inbox from "./InboxNavigator";

const DEFAULT_TAB_NAVIGATION_OPTIONS = {
  activeTintColor: Colors.primary,
  showLabel: false,
  tabStyle: { backgroundColor: Colors.accent },
};

const Tab = createBottomTabNavigator();

const renderIcons = (tabInfo) => (name, size) => (
  <Ionicons name={name} size={size} color={tabInfo.color} />
);

const CoreTabNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        ...DEFAULT_TAB_NAVIGATION_OPTIONS,
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: (tabInfo) => renderIcons(tabInfo)("home", 25),
        }}
      />
      <Tab.Screen
        name={"Explore"}
        component={Explore}
        options={{
          tabBarIcon: (tabInfo) => renderIcons(tabInfo)("search", 25),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarIcon: (tabInfo) =>
            renderIcons(tabInfo)("person-circle-sharp", 30),
        }}
      />
      <Tab.Screen
        name={"Tribe"}
        component={Tribe}
        options={{
          tabBarIcon: (tabInfo) => renderIcons(tabInfo)("leaf", 25),
        }}
      />
      <Tab.Screen
        name={"NewPost"}
        component={Inbox}
        options={{
          tabBarIcon: (tabInfo) => renderIcons(tabInfo)("notifications", 25),
        }}
      />
    </Tab.Navigator>
  );
};

export default CoreTabNavigator;
