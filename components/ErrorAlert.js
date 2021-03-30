import React from "react";
import { Alert } from "react-native";

const ErrorAlert = ({ message }) => {
  return Alert.alert(
    "Oh My trod!",
    message ?? "Something went wrong. Please try again later",
    [
      {
        text: "okay",
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
};

export default ErrorAlert;
