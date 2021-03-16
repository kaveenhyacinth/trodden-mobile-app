import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

const LoadingScreen = (props) => {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.accent,
  },
});

export default LoadingScreen;
