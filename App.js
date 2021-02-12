import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
// import { useScreens } from "react-native-screens";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "./store/reducers/index";
import MainNavigator from "./navigation/MainNavigator";

// useScreens();

// Redux globalized store
const store = createStore(rootReducer);

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
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
