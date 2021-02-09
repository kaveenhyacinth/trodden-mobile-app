import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import FormContainer from "../components/FormContainer";

const SignInScreen = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => console.log(credentials), [credentials]);

  const inputHandler = (inputText, field) => {
    switch (field) {
      case "email":
        setCredentials({ ...credentials, email: inputText });
        break;
      case "password":
        setCredentials({ ...credentials, password: inputText });
        break;

      default:
        break;
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <InputBox
          placeholder="Email"
          style={styles.input}
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "email")}
          value={credentials.email}
          keyboardType="email-address"
        />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "password")}
          value={credentials.password}
        />
        <BigButton style={styles.button}>Sign In</BigButton>
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
