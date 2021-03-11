import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Colors from "../theme/Colors";

const ScreenView = (props) => {
  return (
    <KeyboardAvoidingView
      style={{ ...styles.screen, ...props.style }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.scroll}>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default ScreenView;
