import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";

const LoadingButton = (props) => {
  return (
    <View style={{ ...styles.button, ...props.style }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 5,
    marginBottom: 20,
  },
  buttonText: {
    ...Typography.bodyTextBold,
    color: Colors.accent,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default LoadingButton;
