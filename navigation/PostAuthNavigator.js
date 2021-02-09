import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../theme/Colors";
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
        name="aboutYou"
        component={DetailsScreen}
        options={{
          title: "About You",
        }}
      />
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
