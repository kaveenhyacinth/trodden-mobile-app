import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Colors from "../../theme/Colors";
import BodyText from "./BodyText";

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
      <BodyText style={styles.message}>{props.message}</BodyText>
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
    borderRadius: 5,
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
