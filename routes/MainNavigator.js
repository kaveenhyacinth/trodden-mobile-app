import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Save, Fetch } from "../helpers/deviceStorageHandler";
import { storeTokens } from "../redux";
import api from "../api";
import AuthNavigator from "./AuthNavigator";
import PostAuthNavigator from "./PostAuthNavigator";
import CoreNavigator from "./CoreNavigator";
import LoadingScreen from "../screens/info/LoadingScreen";

const Stack = createStackNavigator();

const MainNavigator = (props) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Update tokens store with new tokens
  const dispatch = useDispatch();

  useEffect(() => {
    // Check storage ref token availability
    const checkIsSignedIn = async () => {
      setLoading(true);
      try {
        // Fetch token form localstorage
        const refToken = await Fetch("refToken");
        if (refToken) {
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

          return setIsSignedIn(true);
        }
      } catch (error) {
        Alert.alert(
          "Oh My Trod!",
          "Something went wrong! Please check your internet connection and try again...",
          [
            {
              text: "I Will",
              style: "destructive",
            },
          ],
          { cancelable: false }
        );
      } finally {
        setLoading(false);
      }
    };
    checkIsSignedIn();
  }, []);

  const handleUpdateTokens = (signToken, refToken) => {
    dispatch(storeTokens(signToken, refToken));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Navigate accordign to auth state
  return isSignedIn ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="core" component={CoreNavigator} />
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="postAuth" component={PostAuthNavigator} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="postAuth" component={PostAuthNavigator} />
      <Stack.Screen name="core" component={CoreNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
