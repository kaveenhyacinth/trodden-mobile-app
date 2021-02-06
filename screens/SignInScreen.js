import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";

const SignInScreen = (props) => {
  return (
    <ScreenView style={styles.screen}>
      <View style={styles.formContainer}>
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
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
  },
  formContainer: {
    width: "90%",
    minWidth: 300,
    maxWidth: "90%",
    alignItems: "stretch",
    marginTop: 26,
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
