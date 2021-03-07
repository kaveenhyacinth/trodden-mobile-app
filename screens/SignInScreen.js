import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Save, Fetch } from "../services/deviceStorage";
import { storeToken } from "../store/actions/storeToken";
import { storeUser } from "../store/actions/storeUser";
import Http from "../api/kit";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import LoadingButton from "../components/LoadingButton";
import FormContainer from "../components/FormContainer";

const SignInScreen = (props) => {
  //#region Local State
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [inputErrorMessage, setInputErrorMessage] = useState({
    email: "",
    password: "",
  });
  //#endregion

  // Handle user input
  const handleInput = (inputText, field) => {
    switch (field) {
      case "email":
        setFormData({ ...formData, email: inputText });
        break;
      case "password":
        setFormData({ ...formData, password: inputText });
        break;

      default:
        break;
    }
  };

  // Uptate new tokens in token store
  const dispatch = useDispatch();
  const handleTokenUpdate = (signToken, refToken) => {
    dispatch(storeToken(signToken, refToken));
  };

  // Update singed user in user store
  const handleUserUpdate = (userData) => {
    dispatch(storeUser(userData));
  };

  const handleError = (error) => {
    const errorData = error.response.data;
    const isValidationError = Array.isArray(errorData.result);
    if (isValidationError) {
      return errorData.result.map((err) => {
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
      errorData.result,
      [
        {
          text: "Okay",
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // getting sign-in response
      const response = await Http.post("/api/auth/signin", {
        email: formData.email,
        password: formData.password,
      });
      if (!response) throw new Error("Something went wrong on our side");

      const signToken = response.data.result.signToken;
      const refToken = response.data.result.refToken;
      const userData = {
        id: response.data.result.id,
        firstName: response.data.result.firstName,
        lastName: response.data.result.lastName,
        username: response.data.result.username,
        email: response.data.result.email,
      };

      // saving refresh token in securestore
      Save("refToken", refToken);
      //updating global state with new sign token
      handleTokenUpdate(signToken, refToken);
      // updating global statewith signed user
      handleUserUpdate(userData);

      props.navigation.replace("core");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <InputBox
          placeholder="Email"
          style={styles.input}
          message={inputErrorMessage.email}
          onChangeText={(inputText) => handleInput(inputText, "email")}
          value={formData.email}
          keyboardType="email-address"
        />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message={inputErrorMessage.password}
          onChangeText={(inputText) => handleInput(inputText, "password")}
          value={formData.password}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton style={styles.button} onPress={handleSignIn}>
            Sign In
          </BigButton>
        )}

        <Pressable
          onPress={() => {
            props.navigation.navigate("signUp");
          }}
        >
          <BodyText style={styles.linkText}>
            if you don't have an account{" "}
            <Text style={styles.link}>Sign Up</Text>
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

export default SignInScreen;
