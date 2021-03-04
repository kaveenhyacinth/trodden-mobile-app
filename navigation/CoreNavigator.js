import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import ExploreNavigation from "./ExploreNavigation";
import TribeNavigation from "./TribeNavigation";
import ProfileNavigation from "./ProfileStackNavigation";
import HomeNavigation from "./HomeNavigation";
import NewPostScreen from "../screens/core/NewPostScreen";

const Tab = createBottomTabNavigator();

const renderFaIcons = (tabInfo) => (name, size) => (
  <FontAwesome5 name={name} size={size} color={tabInfo.color} />
);
const renderIcIcons = (tabInfo) => (name, size) => (
  <Ionicons name={name} size={size} color={tabInfo.color} />
);

const defaultTabOptions = {
  activeTintColor: Colors.primary,
  showLabel: false,
};

const CoreNavigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        ...defaultTabOptions,
        tabStyle: { backgroundColor: Colors.accent },
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={HomeNavigation}
        options={{
          tabBarIcon: (tabInfo) => renderIcIcons(tabInfo)("home", 30),
        }}
      />
      <Tab.Screen
        name={"Explore"}
        component={ExploreNavigation}
        options={{
          tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("search", 25),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={ProfileNavigation}
        options={{
          tabBarIcon: (tabInfo) =>
            renderIcIcons(tabInfo)("person-circle-sharp", 35),
        }}
      />
      <Tab.Screen
        name={"Tribe"}
        component={TribeNavigation}
        options={{
          tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("leaf", 25),
        }}
      />
      <Tab.Screen
        name={"NewPost"}
        component={NewPostScreen}
        options={{
          tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("inbox", 25),
        }}
      />
    </Tab.Navigator>
  );
};

export default CoreNavigator;
