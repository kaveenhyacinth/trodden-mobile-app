import React from "react";
import Picker from "react-native-country-picker-modal";
import { View, StyleSheet } from "react-native";
import InputBox from "./InputBox";

const CallingCodePicker = (props) => {
  const value = props.value;
  return (
    <View style={styles.inputContainer}>
      <Picker
        withFilter
        withFlag
        withCallingCode
        onSelect={props.onSelect}
        renderFlagButton={(props) => {
          return (
            <InputBox
              style={styles.inputBoxCode}
              value={value}
              onFocus={props.onOpen}
              containerStyle={styles.inputCode}
            />
          );
        }}
      />
      <InputBox
        style={styles.inputBoxNumber}
        containerStyle={styles.inputNumber}
        placeholder="Enter you contact number here"
        value={props.inputValue}
        onChangeText={props.onChangeText}
        keyboardType="number-pad"
        maxLength={12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    overflow: "scroll",
  },
  inputCode: {
    width: "18%",
  },
  inputNumber: {
    width: "80%",
  },
  inputBoxCode: {
    textAlign: "center",
    height: 50,
  },
  inputBoxNumber: {
    height: 50,
  },
});

export default CallingCodePicker;
