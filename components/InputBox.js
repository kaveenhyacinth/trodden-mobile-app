import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import Colors from "../theme/Colors";

const InputBox = React.forwardRef((props, ref) => {
  return (
    <View style={{ ...styles.inputContainer, ...props.containerStyle }}>
      <TextInput
        ref={ref}
        blurOnSubmit
        {...props}
        style={{ ...styles.input, ...props.style }}
        autoCorrect={false}
      />
      <Text style={styles.message}>{props.message}</Text>
    </View>
  );
});

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
