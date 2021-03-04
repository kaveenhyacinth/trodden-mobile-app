import React from "react";
import { View, Text, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../theme/Colors";
import NomadsExplore from "../screens/misc/NomadsExploreScreen";
import CaravansExplore from "../screens/misc/CaravansExploreScreen";
import BlazeScreen from "../screens/misc/BlazesScreen";
import { color } from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

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
    fontFamily: "comfortaa-bold",
  },
};

const defaultTabOptions = {
  activeTintColor: Colors.primary,
  inactiveTintColor: Colors.outline,
  labelStyle: { fontFamily: "comfortaa-bold" },
  tabStyle: { backgroundColor: Colors.accent },
  showIcon: true,
  showLabel: false,
};

const ExploreNavigator = (props) => {
  return (
    <React.Fragment>
      <View
        style={{
          height: SCREEN_HEIGHT * 0.2,
          width: SCREEN_WIDTH,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: SCREEN_WIDTH * 0.4,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.accent,
          }}
        >
          <View
            style={{
              width: SCREEN_WIDTH * 0.3,
              height: SCREEN_WIDTH * 0.3,
              borderRadius: SCREEN_WIDTH * 0.15,
              backgroundColor: Colors.primary,
            }}
          ></View>
        </View>
        <View style={{ flex: 1, backgroundColor: Colors.accent }}>
          <Text>Kaveen Hyacinth</Text>
        </View>
      </View>
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
        <Tab.Screen
          name="nomads"
          component={NomadsExplore}
          options={{
            title: "Settings",
            tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("cog", 20),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
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
