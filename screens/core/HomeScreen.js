import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";
import ScreenView from "../../components/ScreenView";
import Memory from "../../components/Memory";
import NewPost from "../../components/NewPostHome";
import EmptyScreen from "../extra/EmptyScreen";

const HomeScreen = (props) => {
  const [memos, setMemos] = useState(true);

  return (
    <ScreenView style={styles.screen}>
      <NewPost onPress={() => props.navigation.navigate("newMemo")} />
      {memos ? (
        <>
          <Memory />
          <Memory />
        </>
      ) : (
        <EmptyScreen />
      )}
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background
  }
})

export default HomeScreen;
