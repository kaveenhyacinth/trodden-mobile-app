import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import SignupConfirmationScreen from "../screens/auth/SignUpConfirmationScreen";
import SignupInfoOneScreen from "../screens/auth/SignUpInfoOneScreen";
import SignupInfoTwoScreeen from "../screens/auth/SignUpInfoTwoScreen";
import SignUpInterestScreen from "../screens/auth/SignUpInterestsScreen";

const Stack = createStackNavigator();

const DEFAULT_STACK_NAVIGATION_OPTIONS = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTitleStyle: {
    fontFamily: Typography.displayHeavy.fontFamily,
    letterSpacing: Typography.displayHeavy.letterSpacing,
  },
  headerTintColor: Colors.info,
};

const PostAuthStackNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...DEFAULT_STACK_NAVIGATION_OPTIONS }}>
      <Stack.Screen
        name="confirmOTP"
        component={SignupConfirmationScreen}
        options={{
          title: "Confirm Signup",
        }}
      />
      <Stack.Screen
        name="signupInfoOne"
        component={SignupInfoOneScreen}
        options={{
          title: "About You",
        }}
      />
      <Stack.Screen
        name="signupInfoTwo"
        component={SignupInfoTwoScreeen}
        options={{
          title: "About You",
        }}
      />
      <Stack.Screen
        name="selectInterests"
        component={SignUpInterestScreen}
        options={{
          title: "Travel Interests",
        }}
      />
    </Stack.Navigator>
  );
};

export default PostAuthStackNavigator;
