import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import FormContainer from "../components/FormContainer";

const SignUpScreen = (props) => {
  const [formData, setFormData] = useState({
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
        setFormData({ ...formData, email: inputText });
        break;
      case "password":
        setFormData({ ...formData, password: inputText });
        break;

      default:
        break;
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        {/* First Name input*/}
        <InputBox
          placeholder="First Name"
          style={styles.input}
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "firstName")}
          value={formData.firstName}
        />
        <InputBox
          placeholder="Last Name"
          style={styles.input}
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "lastName")}
          value={formData.lastName}
        />
        <InputBox
          placeholder="UserName"
          style={styles.input}
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "username")}
          value={formData.username}
        />
        <InputBox
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "email")}
          value={formData.email}
        />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "password")}
          value={formData.password}
        />
        <BigButton
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("postAuth");
            console.log(formData);
          }}
        >
          Sign Up
        </BigButton>
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
