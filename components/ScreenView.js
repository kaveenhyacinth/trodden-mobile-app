import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";

import Colors from "../theme/Colors";

const ScreenView = (props) => {
  return (
    <View style={{ ...styles.screen, ...props.style }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {props.children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  scroll: {
    flexGrow: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default ScreenView;
