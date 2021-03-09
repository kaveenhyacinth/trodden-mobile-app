import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography"
import SignupConfirmationScreen from "../screens/SignUpConfirmationScreen";
import SignupInfoOneScreen from "../screens/SignUpInfoOneScreen";
import SignupInfoTwoScreeen from "../screens/SignUpInfoTwoScreen";
import SignUpInterestScreen from "../screens/SignUpInterestsScreen";

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTitleStyle: {
    fontFamily: Typography.displayHeavy.fontFamily,
    letterSpacing: Typography.displayHeavy.letterSpacing,
  },
  headerTintColor: Colors.info,
};

const PostAuthNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ ...defaultStackNavOptions }}>
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

export default PostAuthNavigator;
