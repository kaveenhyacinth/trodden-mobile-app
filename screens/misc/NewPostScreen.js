import React from "react";
import { Text, View, ScrollView } from "react-native";
import Colors from "../../theme/Colors";
import ScreenView from "../../components/ScreenView";
import Memory from "../../components/Memory";
import NewPost from "../../components/NewPostHome";

const NewPostScreen = () => {
  return (
    <ScreenView style={{ backgroundColor: Colors.background }}>
      <Text>New Post</Text>
    </ScreenView>
  );
};

export default NewPostScreen;
