import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable, Alert } from "react-native";

import Http from "../api/kit";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import LoadingButton from "../components/LoadingButton";
import FormContainer from "../components/FormContainer";

const SignUpScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  // catch error messages
  const [inputErrorMessage, setInputErrorMessage] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => console.log(formData), [formData]);

  const inputHandler = (inputText, field) => {
    switch (field) {
      case "firstName":
        setFormData({ ...formData, firstName: inputText });
        break;
      case "lastName":
        setFormData({ ...formData, lastName: inputText });
        break;
      case "username":
        setFormData({ ...formData, username: inputText.toLowerCase() });
        break;
      case "email":
        setFormData({ ...formData, email: inputText.toLowerCase() });
        break;
      case "password":
        setFormData({ ...formData, password: inputText });
        break;

      default:
        break;
    }
  };

  const handleError = (error) => {
    const errorData = error.response.data;
    const isValidationError = Array.isArray(errorData.result);
    if (isValidationError) {
      return errorData.result.map((err) => {
        // setting firstname error msg
        if (err.param === "firstName")
          setInputErrorMessage((prevState) => ({
            ...prevState,
            firstName: err.msg,
          }));
        // setting last error msg
        if (err.param === "lastName")
          setInputErrorMessage((prevState) => ({
            ...prevState,
            lastName: err.msg,
          }));
        // setting username error msg
        if (err.param === "username")
          setInputErrorMessage((prevState) => ({
            ...prevState,
            username: err.msg,
          }));
        // setting email error msg
        if (err.param === "email")
          setInputErrorMessage((prevState) => ({
            ...prevState,
            email: err.msg,
          }));
        // setting password error msg
        if (err.param === "password")
          setInputErrorMessage((prevState) => ({
            ...prevState,
            password: err.msg,
          }));
      });
    }
    // if not a validation error
    return Alert.alert(
      "Oh My Trod!",
      errorData.msg,
      [
        {
          text: "Okay",
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const requestSignup = async () => {
    try {
      setLoading(true);
      const response = await Http.post("/api/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (!response) throw new Error("Please try again later");
      props.navigation.replace("postAuth", {
        screen: "confirmOTP",
        params: {
          otp: response.data.result.otp,
          signupToken: response.data.result.signupToken,
        },
      });
    } catch (error) {
      console.log("Signup Errors:", error.response.data);
      if (!error.response)
        return Alert.alert(
          "Something went wrong",
          "Sorry, it's our fault! Please try again later...",
          [
            {
              text: "Okay",
              style: "destructive",
            },
          ],
          { cancelable: false }
        );
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <InputBox
          placeholder="First Name"
          style={styles.input}
          message={inputErrorMessage.firstName}
          onChangeText={(inputText) => inputHandler(inputText, "firstName")}
          value={formData.firstName}
        />
        <InputBox
          placeholder="Last Name"
          style={styles.input}
          message={inputErrorMessage.lastName}
          onChangeText={(inputText) => inputHandler(inputText, "lastName")}
          value={formData.lastName}
        />
        <InputBox
          placeholder="UserName"
          style={styles.input}
          message={inputErrorMessage.username}
          onChangeText={(inputText) => inputHandler(inputText, "username")}
          value={formData.username}
        />
        <InputBox
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          message={inputErrorMessage.email}
          onChangeText={(inputText) => inputHandler(inputText, "email")}
          value={formData.email}
        />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message={inputErrorMessage.password}
          onChangeText={(inputText) => inputHandler(inputText, "password")}
          value={formData.password}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton style={styles.button} onPress={requestSignup}>
            Sign Up
          </BigButton>
        )}

        <Pressable
          onPress={() => {
            props.navigation.navigate("signIn");
          }}
        >
          <BodyText style={styles.linkText}>
            if you already have an account{" "}
            <Text style={styles.link}>Sign In</Text>
          </BodyText>
        </Pressable>
      </FormContainer>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  linkText: {
    ...Typography.bodyText,
    alignItems: "center",
  },
  link: {
    ...Typography.bodyTextBold,
    color: Colors.primary,
  },
});

export default SignUpScreen;
