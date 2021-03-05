import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Colors from "../theme/Colors";

const ScreenView = (props) => {
  return (
    <View style={{ ...styles.screen, ...props.style }}>
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.scroll}>
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
