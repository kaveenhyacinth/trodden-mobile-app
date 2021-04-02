import { Alert } from "react-native";

const ErrorAlertModal = (message = "", error = null) => {
  console.error("Error occured", error);
  return Alert.alert(
    "Oh My trod!",
    message ?? error.message ?? "Something went wrong. Please try again later",
    [
      {
        text: "Okay",
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
};

export default ErrorAlertModal;
