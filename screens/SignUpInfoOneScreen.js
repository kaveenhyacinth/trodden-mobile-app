import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import Http from "../api/kit";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BodyText from "../components/BodyText";
import InputBox from "../components/InputBox";
import CountryPicker from "../components/CountryPicker";
import CallingCodePicker from "../components/CallingCodePicker";
import BigButton from "../components/BigButton";
import LoadingButton from "../components/LoadingButton";
import FormContainer from "../components/FormContainer";

const SignupInfoOneScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [countrycodeInput, setCountryCodeInput] = useState("94");
  const [contactInput, setContactInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [regionnput, setRegionInput] = useState("");
  const [birthdayInput, setBirthdayInput] = useState("");
  const [genderInput, setGenderInput] = useState("");

  useEffect(() => {
    console.log("CountryCode:", countrycodeInput);
  }, []);

  const handleCountryPick = (country) => {
    console.log("Countries:", country);
    setCountryInput(country.name);
    setRegionInput(country.region);
  };

  const handleCountryCodePick = (country) => {
    console.log("Countries:", country);
    setCountryCodeInput(country.callingCode[0]);
  };

  const handleContactInput = (value) => {
    setContactInput(value);
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <BodyText style={styles.infoText}>
          Awesome Nomad! Welcome to the world of Trodden. Tell us more about
          you....
        </BodyText>
        <BodyText>Select your country</BodyText>
        <CountryPicker
          onSelect={(country) => handleCountryPick(country)}
          value={countryInput}
        />
        <BodyText>Enter your contact number</BodyText>
        <CallingCodePicker
          onSelect={(country) => handleCountryCodePick(country)}
          value={countrycodeInput}
          inputValue={contactInput}
          onChangeText={handleContactInput}
        />
        <BigButton style={styles.button}>Next</BigButton>
      </FormContainer>
      <BodyText style={styles.next}>1/3</BodyText>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
  },
  infoText: {
    ...Typography.bodyText,
    alignItems: "flex-start",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  next: {
    ...Typography.bodyText,
    alignItems: "flex-end",
  },
});

export default SignupInfoOneScreen;
