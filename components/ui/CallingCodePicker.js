import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Picker from "react-native-country-picker-modal";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import InputBox from "./InputBox";
import Button from "./BigButton";

const CallingCodePicker = (props) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View style={styles.inputContainer}>
      <Picker
        withFilter
        withFlag
        withCallingCode
        withAlphaFilter
        withCloseButton={false}
        onSelect={props.onSelect}
        renderFlagButton={(props) => {
          return (
            <View style={styles.inputCode}>
              <Button
                textStyle={styles.text}
                style={styles.inputBoxCode}
                onPress={props.onOpen}
              >
                {value ?? "00"}
              </Button>
            </View>
          );
        }}
      />
      <InputBox
        style={styles.inputBoxNumber}
        containerStyle={styles.inputNumber}
        placeholder="Enter you contact number here"
        value={props.inputValue}
        message={props.message}
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
    marginVertical: 5,
  },
  inputNumber: {
    width: "80%",
  },
  inputBoxCode: {
    // textAlign: "center",
    height: 50,
    paddingHorizontal: 0,
    backgroundColor: Colors.accent,
    borderColor: Colors.outline,
    borderRadius: 5,
    borderWidth: 1,
  },
  text: {
    ...Typography.placeholderText,
    textAlign: "center",
  },
  inputBoxNumber: {
    height: 50,
  },
});

export default CallingCodePicker;
