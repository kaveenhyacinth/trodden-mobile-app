import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { saveKey } from "../services/deviceStorage";
import { storeToken } from "../store/actions/storeToken";
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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // catch error messages
  const [inputErrorMessage, setInputErrorMessage] = useState({
    email: "",
    password: "",
  });

  const localSignToken = useSelector((state) => state.tokenStore.signToken);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Updated Token @UseEffect: " + localSignToken);
  }, [localSignToken]);

  const inputHandler = (inputText, field) => {
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

  const updateTokenHandler = (signToken, refToken) => {
    dispatch(storeToken(signToken, refToken));
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

  const requestSignin = async () => {
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

      // saving refresh token in securestore
      saveKey("refToken", refToken);

      //updating global state with new sign token
      updateTokenHandler(signToken, refToken);

      // TODO: => navigation (._.)
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
          onChangeText={(inputText) => inputHandler(inputText, "email")}
          value={formData.email}
          keyboardType="email-address"
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
          <BigButton style={styles.button} onPress={requestSignin}>
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
