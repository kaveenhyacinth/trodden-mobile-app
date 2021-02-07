import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import Colors from "../theme/Colors";

const InputBox = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        {...props}
        style={{ ...styles.input, ...props.style }}
        blurOnSubmit
        autoCorrect={false}
      />
      <Text style={styles.message}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 5,
  },
  input: {
    height: 50,
    borderColor: Colors.outline,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  message: {
    color: "red",
    marginTop: 0,
    paddingHorizontal: 5,
  },
});

export default InputBox;
