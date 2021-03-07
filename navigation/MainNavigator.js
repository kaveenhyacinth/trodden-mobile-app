import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { Fetch } from "../services/deviceStorage";
import { storeToken } from "../store/actions/storeToken";
import refreshTokens from "../services/refreshTokens";
import AuthNavigator from "./AuthNavigator";
import PostAuthNavigator from "./PostAuthNavigator";
import CoreNavigator from "./CoreNavigator";

const Stack = createStackNavigator();

const MainNavigator = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Update tokens store with new tokens
  const dispatch = useDispatch();
  const handleTokenUpdate = (signToken, refToken) => {
    dispatch(storeToken(signToken, refToken));
  };

  useEffect(() => {
    // Check storage ref token availability
    const handleSigninCheck = async () => {
      try {
        const refToken = await Fetch("refTokn");
        if (!refToken) return setIsSignedIn(false);

        const { newSignInToken, newRefToken } = await refreshTokens(refToken);
        handleTokenUpdate(newSignInToken, newRefToken);

        return setIsSignedIn(true);
      } catch (error) {
        console.log("Error loading screen token checkup:", error.message);
      }
    };
    handleSigninCheck();
  }, []);

  // Navigate accordign to auth state
  return isSignedIn ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="core" component={CoreNavigator} />
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
