import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Picker from "react-native-country-picker-modal";
import Button from "./BigButton";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";

const CountryPicker = (props) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Picker
      withFilter
      withFlag
      withAlphaFilter
      withModal
      withCloseButton={false}
      onSelect={props.onSelect}
      renderFlagButton={(props) => (
        <Button
          style={styles.button}
          textStyle={styles.text}
          onPress={props.onOpen}
        >
          {value ?? "Select your country"}
        </Button>
      )}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: Colors.accent,
    borderColor: Colors.outline,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  text: {
    ...Typography.placeholderText,
    textAlign: "left",
  },
});

export default CountryPicker;
