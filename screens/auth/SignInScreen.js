import React, { useState, useReducer } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Save } from "../../helpers/deviceStorageHandler";
import { storeTokens } from "../../redux";
import api from "../../api";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ui/ScreenView";
import BodyText from "../../components/ui/BodyText";
import InputBox from "../../components/ui/InputBox";
import BigButton from "../../components/ui/BigButton";
import LoadingButton from "../../components/ui/LoadingButton";
import FormContainer from "../../components/ui/FormContainer";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.payload.key]: action.payload.value,
    };

    return {
      ...state,
      inputValues: updatedValues,
    };
  }
  return state;
};

const SignInScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState({
    email: "",
    password: "",
  });
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: true,
      password: true,
    },
    formValidity: false,
  });

  const dispatch = useDispatch();

  // Handle user input
  const handleInput = (inputText, key) =>
    dispatchFormState({
      type: FORM_UPDATE,
      payload: {
        value: inputText,
        key,
      },
    });

  // Uptate new tokens in token store
  const handleTokenUpdate = (signToken, refToken) => {
    dispatch(storeTokens(signToken, refToken));
  };

  const handleError = (error) => {
    const errorData = error.response.data ?? error;
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
    return ErrorAlertModal(errorData.result, errorData);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // getting sign-in response
      const signinBody = {
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      };
      const response = await api.post.signin(signinBody);
      if (!response) throw new Error("Something went wrong on our side");

      const signToken = response.data.result.signToken;
      const refToken = response.data.result.refToken;
      const nomadId = response.data.result.id;

      // saving sign and refresh tokens in securestore
      await Save("signToken", signToken);
      await Save("refToken", refToken);
      await Save("nomadId", nomadId);
      //updating global state with new sign token
      handleTokenUpdate(signToken, refToken);

      props.navigation.replace("core");
    } catch (error) {
      if (!error.response)
        return ErrorAlertModal(
          "Sorry, it's our fault! Please try again later...",
          error
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
          placeholder="Email"
          style={styles.input}
          message={inputErrorMessage.email}
          onChangeText={(inputText) => handleInput(inputText, "email")}
          value={formState.inputValues.email}
          keyboardType="email-address"
          returnKeyType="next"
        />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message={inputErrorMessage.password}
          onChangeText={(inputText) => handleInput(inputText, "password")}
          value={formState.inputValues.password}
          returnKeyType="send"
          onSubmitEditing={handleSignIn}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton style={styles.button} onPress={handleSignIn}>
            Sign In
          </BigButton>
        )}
        <BodyText style={styles.linkText}>
          if you don't have an account{" "}
          <BodyText
            onPress={() => {
              props.navigation.navigate("signUp");
            }}
            style={styles.link}
          >
            Sign Up
          </BodyText>
        </BodyText>
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
