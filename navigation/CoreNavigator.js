import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { getNomads } from "../store/actions/storeNomad";
import { Fetch } from "../services/deviceStorage";
import Colors from "../theme/Colors";
import ExploreNavigation from "./ExploreNavigation";
import TribeNavigation from "./TribeNavigation";
import ProfileNavigation from "./ProfileStackNavigation";
import HomeNavigation from "./HomeNavigation";
import InboxScreen from "../screens/core/InboxScreen";
import LoadingScreen from "../screens/extra/LoadingScreen";

const Tab = createBottomTabNavigator();

const defaultTabOptions = {
  activeTintColor: Colors.primary,
  showLabel: false,
};

const CoreNavigator = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleLoadNomad = async () => {
      try {
        setLoading(true);
        const nomadId = await Fetch("nomadId");
        await getNomads(nomadId)(dispatch);
      } catch (error) {
        Alert.alert(
          "Oh My trod!",
          error.message ?? "Something went wrong. Please try again later",
          [
            {
              text: "I Will",
              style: "destructive",
            },
          ],
          { cancelable: false }
        );
        console.log("Error Happen", error);
      } finally {
        setLoading(false);
      }
    };
    handleLoadNomad();
  }, []);

  const renderFaIcons = (tabInfo) => (name, size) => (
    <FontAwesome5 name={name} size={size} color={tabInfo.color} />
  );
  const renderIcIcons = (tabInfo) => (name, size) => (
    <Ionicons name={name} size={size} color={tabInfo.color} />
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        ...defaultTabOptions,
        tabStyle: { backgroundColor: Colors.accent },
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={HomeNavigation}
        options={{
          tabBarIcon: (tabInfo) => renderIcIcons(tabInfo)("home", 30),
        }}
      />
      <Tab.Screen
        name={"Explore"}
        component={ExploreNavigation}
        options={{
          tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("search", 25),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={ProfileNavigation}
        options={{
          tabBarIcon: (tabInfo) =>
            renderIcIcons(tabInfo)("person-circle-sharp", 35),
        }}
      />
      <Tab.Screen
        name={"Tribe"}
        component={TribeNavigation}
        options={{
          tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("leaf", 25),
        }}
      />
      <Tab.Screen
        name={"NewPost"}
        component={InboxScreen}
        options={{
          tabBarIcon: (tabInfo) => renderFaIcons(tabInfo)("inbox", 25),
        }}
      />
    </Tab.Navigator>
  );
};

export default CoreNavigator;
