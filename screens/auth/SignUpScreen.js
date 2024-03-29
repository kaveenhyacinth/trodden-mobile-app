import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { StyleSheet } from "react-native";
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

const ValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(/^[A-z]+$/, "Only letters!")
    .min(2, "Too short! Enter at least two characters")
    .max(32, "Too long! Keep it less than 32 characters")
    .required("Required!"),
  lastName: yup
    .string()
    .trim()
    .matches(/^[A-z\s]+$/, "Only letters!")
    .min(2, "Too short! Enter at least two characters")
    .max(32, "Too long! Keep it less than 32 characters")
    .required("Required!"),
  username: yup
    .string()
    .trim()
    .min(5, "Too short! Enter at least 5 characters")
    .max(12, "Too long!", "Keep it less than 12 characters")
    .matches(
      /^(?=[a-zA-Z0-9._]{5,12}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      "Invalid Username"
    )
    .required("Required!"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email!")
    .required("Required!"),
  password: yup
    .string()
    .min(8, "Too short! Enter at leas 8 characters")
    .max(20, "Too long! Keep it less than 20 characters")
    .required("Required!"),
});

const SignUpScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleError = (error) => {
    const errorData = error.response.data ?? error;
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

    return ErrorAlertModal(errorData.msg, errorData);
  };

  const handleSignup = async (formData) => {
    try {
      setLoading(true);

      const signupBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const response = await api.post.signup(signupBody);
      if (!response.data.result) throw new Error("Please try again later");

      console.log(
        "OTP Code (Incase email service get stucked):",
        response.data.result.otp
      );

      // Navigate to confirmation
      props.navigation.replace("postAuth", {
        screen: "confirmOTP",
        params: {
          otp: response.data.result.otp,
          signupToken: response.data.result.signupToken,
        },
      });
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
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => handleSignup(values)}
        validationSchema={ValidationSchema}
      >
        {(formik) => (
          <FormContainer>
            <InputBox
              placeholder="First Name"
              style={styles.input}
              message={formik.errors.firstName}
              onChangeText={formik.handleChange("firstName")}
              onBlur={formik.handleBlur("firstName")}
              value={formik.values.firstName}
            />
            <InputBox
              placeholder="Last Name"
              style={styles.input}
              message={formik.errors.lastName}
              onChangeText={formik.handleChange("lastName")}
              value={formik.values.lastName}
            />
            <InputBox
              placeholder="UserName"
              style={styles.input}
              message={formik.errors.username}
              onChangeText={formik.handleChange("username")}
              value={formik.values.username}
            />
            <InputBox
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              message={formik.errors.email}
              onChangeText={formik.handleChange("email")}
              value={formik.values.email}
            />
            <InputBox
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={formik.handleSubmit}
              message={formik.errors.password}
              onChangeText={formik.handleChange("password")}
              value={formik.values.password}
            />
            {loading ? (
              <LoadingButton />
            ) : (
              <BigButton style={styles.button} onPress={formik.handleSubmit}>
                Sign Up
              </BigButton>
            )}
            <BodyText style={styles.linkText}>
              if you already have an account{" "}
              <BodyText
                onPress={() => {
                  props.navigation.navigate("signIn");
                }}
                style={styles.link}
              >
                Sign In
              </BodyText>
            </BodyText>
          </FormContainer>
        )}
      </Formik>
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
