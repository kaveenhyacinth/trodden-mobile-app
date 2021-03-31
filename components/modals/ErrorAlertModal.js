import { Alert } from "react-native";

const ErrorAlertModal = (error) => {
  console.error("Error occured", error);
  return Alert.alert(
    "Oh My trod!",
    error.message ?? "Something went wrong. Please try again later",
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
