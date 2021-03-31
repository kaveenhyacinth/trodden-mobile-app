import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";

const BigButton = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      onPress={props.onPress}
    >
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignContent: "center",
    justifyContent: "center",
    borderColor: Colors.primary,
    borderRadius: 5,
    borderWidth: 2,
  },
  buttonText: {
    ...Typography.bodyTextBold,
    color: Colors.primary,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default BigButton;
