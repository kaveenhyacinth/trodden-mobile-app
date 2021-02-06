import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";

const SignUpScreen = (props) => {
  return (
    <ScreenView style={styles.screen}>
      <View style={styles.formContainer}>
        <InputBox placeholder="First Name" style={styles.input} message="" />
        <InputBox placeholder="Last Name" style={styles.input} message="" />
        <InputBox placeholder="UserName" style={styles.input} message="" />
        <InputBox placeholder="Email" style={styles.input} message="" />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message=""
        />
        <BigButton style={styles.button}>Sign Up</BigButton>
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
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
  },
  formContainer: {
    flex: 1,
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

export default SignUpScreen;
