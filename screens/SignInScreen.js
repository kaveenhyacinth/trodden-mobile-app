import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable, Alert } from "react-native";
// import { useSelector } from "react-redux";

import { saveKey, loadToken } from "../services/deviceStorage";
import Http from "../api/kit";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import BigButton from "../components/BigButton";
import FormContainer from "../components/FormContainer";

const SignInScreen = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // const stateToken = () => {
    //   let theStateToken = useSelector((state) => state.storeToken.idToken);
    //   console.log(theStateToken);
    // };
  }, []);

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

  const requestSignin = () => {
    Http.post("/api/auth/signin", {
      email: formData.email,
      password: formData.password,
    })
      .then((res) => {
        saveKey("id_token", res.data.token);
        console.log("Token", loadToken("id_token"));
      })
      .catch((err) => console.error(err));

    // TODO: => navigation (._.)
    // Alert.alert("SignIn", res.data.msg, [
    //   {
    //     text: "Okay",
    //   },
    // ])
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <InputBox
          placeholder="Email"
          style={styles.input}
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "email")}
          value={formData.email}
          keyboardType="email-address"
        />
        <InputBox
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "password")}
          value={formData.password}
        />
        <BigButton style={styles.button} onPress={requestSignin}>
          Sign In
        </BigButton>
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
