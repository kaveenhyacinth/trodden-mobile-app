import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../theme/Colors";
import ScreenView from "../../components/ScreenView";
import Memory from "../../components/Memory";
import NewPost from "../../components/NewPostHome";
import EmptyScreen from "../extra/EmptyScreen";

const HomeScreen = (props) => {
  const [memos, setMemos] = useState(true);

  const nomadStore = useSelector(state => state.nomadStore)

  useEffect(() => console.log("Current user Data: " + nomadStore), []);

  return (
    <ScreenView style={styles.screen}>
      <NewPost onPress={() => props.navigation.navigate("newMemo")} />
      {/* {memos ? (
        <>
          <Memory />
          <Memory />
        </>
      ) : (
        <EmptyScreen />
      )} */}
      <EmptyScreen />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
