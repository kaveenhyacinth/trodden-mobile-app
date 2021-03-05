import React from "react";
import { Text, View } from "react-native";
import Colors from "../../theme/Colors";
import ScreenView from "../../components/ScreenView";
import Memory from "../../components/Memory";

const HomeScreen = () => {
  return (
    <ScreenView style={{backgroundColor: Colors.background}}>
      <Memory />
      <Memory />
    </ScreenView>
  );
};

export default HomeScreen;
