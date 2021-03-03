import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../theme/Colors";
import SignupConfirmationScreen from "../screens/SignUpConfirmationScreen";
import SignupInfoOneScreen from "../screens/SignUpInfoOneScreen";
import DetailsScreen from "../screens/DetailsScreen";
import InterestScreen from "../screens/InterestsScreen";

const Stack = createStackNavigator();

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.accent,
  },
  headerTitleStyle: {
    fontFamily: "comfortaa-bold",
  },
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
          title: "Tell Us More",
        }}
      />
      {/* <Stack.Screen
        name="aboutYou"
        component={DetailsScreen}
        options={{
          title: "About You",
        }}
      /> */}
      <Stack.Screen
        name="selectInterests"
        component={InterestScreen}
        options={{
          title: "Interests",
        }}
      />
    </Stack.Navigator>
  );
};

export default PostAuthNavigator;
