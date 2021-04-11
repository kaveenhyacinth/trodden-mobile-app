import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Save, Fetch } from "./helpers/deviceStorageHandler";
import { storeTokens } from "./redux";
import api from "./api";
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
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateTokens = (signToken, refToken) => {
    dispatch(storeTokens(signToken, refToken));
  };

  const handleCheckIsUser = async () => {
    try {
      // Fetch token form localstorage
      const refToken = await Fetch("refToken");
      if (!refToken) return isUser(false);

      // Request for new tokens
      const refreshTokenBody = {
        refreshToken: refToken,
      };
      const response = await api.post.refreshToken(refreshTokenBody);

      if (!response.data.result) throw new Error("Something went wrong!");

      const newSignToken = response.data.result.signToken;
      const newRefToken = response.data.result.refToken;
      const nomadId = response.data.result.id;

      // Update state and localstorage with new tokens
      handleUpdateTokens(newSignToken, newRefToken);
      await Save("signToken", newSignToken);
      await Save("refToken", newRefToken);
      await Save("nomadId", nomadId);

      return isUser(true);
    } catch (error) {
      console.error("Error Happen in sign in", error);
      setIsUser(false);
    }
  };

  const handleAppLoading = () => {
    fetchFonts();
    // handleCheckIsUser();
  };

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
        <MainNavigator isUser={isUser} />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
