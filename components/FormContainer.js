import React from "react";
import { View, StyleSheet } from "react-native";

const FormContainer = (props) => {
  return (
    <View style={{ ...styles.formContainer, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    width: "90%",
    minWidth: 300,
    maxWidth: "90%",
    alignItems: "stretch",
    marginTop: 26,
  },
});

export default FormContainer;
