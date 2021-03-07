import React from "react";
import { Text, View, ScrollView } from "react-native";
import Colors from "../../theme/Colors";
import ScreenView from "../../components/ScreenView";
import Memory from "../../components/Memory";
import NewPost from "../../components/NewPostHome";

const HomeScreen = (props) => {
  return (
    <ScreenView style={{ backgroundColor: Colors.background }}>
      <NewPost onPress={() => props.navigation.navigate("newMemo")} />
      <Memory />
      <Memory />
    </ScreenView>
  );
};

export default HomeScreen;
