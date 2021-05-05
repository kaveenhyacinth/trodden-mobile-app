import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import MainNavigator from "./routes/MainNavigator";
import store from "./redux/store";
// import { useScreens } from "react-native-screens";

// useScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
    "comfortaa-bold": require("./assets/fonts/Comfortaa-Bold.ttf"),
    fonarto: require("./assets/fonts/Fonarto.ttf"),
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
