import React from "react";
import { SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

const LoadingScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.accent,
  },
});

export default LoadingScreen;
