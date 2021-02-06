import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView } from "react-native";

// import OpenScreen from './screens/OpenScreen';
// import SignInScreen from './screens/SignInScreen';
// import SignUpScreen from './screens/SignUpScreen';
// import TestScreen from './screens/testScreen';

import AuthNavigator from "./navigation/AuthNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    "comfortaa-light": require("./assets/fonts/Comfortaa-Light.ttf"),
    "comfortaa-bold": require("./assets/fonts/Comfortaa-Bold.ttf"),
    "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semi-bold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    // <SafeAreaView style={styles.container}>
    //   {/* <OpenScreen /> */}
    //   {/* <SignInScreen /> */}
    //   <SignUpScreen />
    // </SafeAreaView>

    <NavigationContainer>
      <AuthNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
