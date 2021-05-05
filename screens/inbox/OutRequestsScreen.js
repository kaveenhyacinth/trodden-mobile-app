import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../theme/Colors";
import EmptyScreen from "../info/EmptyScreen";

const OutRequestsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <EmptyScreen />
    </View>
  );
};

export default OutRequestsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
});
