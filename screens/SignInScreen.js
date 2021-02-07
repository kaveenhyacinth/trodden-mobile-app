import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import FormContainer from "../components/FormContainer";

const SignInScreen = (props) => {
  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <InputBox placeholder="Email" style={styles.input} message="" />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message=""
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
