import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ProfileOwn from "../screens/views/ProfileOwn";
import NewTripScreen from "../screens/views/NewTripScreen";

const Stack = createStackNavigator();

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

const OwnProfileStackNavigation = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
      <Stack.Screen name="Nomad" component={ProfileOwn} />

      <Stack.Screen
        name="Profile"
        component={ProfileOwn}
        options={{ title: "..." }}
      />
      <Stack.Screen
        name="NewTrip"
        component={NewTripScreen}
        options={{
          title: "Create New Trip",
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default OwnProfileStackNavigation;
