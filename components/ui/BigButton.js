import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";

const BigButton = (props) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      onPress={props.onPress}
    >
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={{ ...styles.buttonText, ...props.textStyle }}>
          {props.children}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignContent: "center",
    justifyContent: "center",
    borderColor: Colors.primary,
    borderRadius: 5,
    // borderWidth: 2,
  },
  buttonText: {
    ...Typography.bodyTextBold,
    color: Colors.accent,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default BigButton;
