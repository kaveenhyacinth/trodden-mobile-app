import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ProfileOwn from "../screens/profile/ProfileOwn";
import CreateTripScreen from "../screens/create/CreateTripScreen";
import CreateTripDayPlanScreen from "../screens/create/CreateTripDayPlan";
import TripScreen from "../screens/profile/TripScreen";

const Stack = createStackNavigator();

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

const ProfileStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...DEFAULT_STACK_NAVIGATION_OPTIONS }}>
      <Stack.Screen name="Nomad" component={ProfileOwn} />
      <Stack.Screen
        name="Profile"
        component={ProfileOwn}
        options={{ title: "..." }}
      />
      <Stack.Screen
        name="NewTrip"
        component={CreateTripScreen}
        options={{
          title: "Plan New Trip",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="DayTrip"
        component={CreateTripDayPlanScreen}
        options={{
          title: "Plan Your Trip",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Trip"
        component={TripScreen}
        options={{
          title: "...",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
