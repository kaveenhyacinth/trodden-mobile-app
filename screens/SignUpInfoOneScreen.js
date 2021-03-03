import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/actions/storeUser";
import DatePickerModel from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
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
  //#region Local State
  const [loading, setLoading] = useState(false);
  const [countrycodeInput, setCountryCodeInput] = useState("94");
  const [contactInput, setContactInput] = useState();
  const [countryInput, setCountryInput] = useState();
  const [regionInput, setRegionInput] = useState();
  const [birthdateInput, setBirthdateInput] = useState();
  const [birthdateOutput, setBirthdateOutput] = useState();
  const [isDatePickerVisible, setiIsDatePickerVisible] = useState(false);
  const [genderInput, setGenderInput] = useState("");
  //#endregion

  useEffect(() => {
    console.log("CountryCode:", countrycodeInput);
  }, []);
  const datePickInput = useRef();

  //#region Input Handles

  const handleCountryPick = (country) => {
    console.log("Countries:", country);
    setCountryInput(country.name);
    setRegionInput(country.region);
  };

  const handleCountryCodePick = (country) => {
    setCountryCodeInput(country.callingCode[0]);
  };

  const handleContactInput = (value) => {
    setContactInput(value);
  };

  const handleShowDatePicker = () => {
    setiIsDatePickerVisible(true);
    datePickInput.current.blur();
  };

  const handleHideDatePicker = () => {
    setiIsDatePickerVisible(false);
    datePickInput.current.blur();
  };

  const handleBirthdateInput = (date) => {
    const stringDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setBirthdateOutput(stringDate);
    setBirthdateInput(date);
    handleHideDatePicker();
  };

  const handleGenderInput = (itemValue, itemIndex) => {
    setGenderInput(itemValue);
  };
  //#endregion

  const dispatch = useDispatch();
  const updateUserStore = (userData) => {
    dispatch(storeUser(userData));
  };

  const handleOnSubmitNext = (
    countrycodeInput,
    contactInput,
    regionInput,
    countryInput,
    birthdateInput,
    genderInput
  ) => {
    const userData = {
      contact: `${countrycodeInput}${contactInput}`,
      country: countryInput,
      region: regionInput,
      birthday: birthdateInput,
      gender: genderInput,
    };
    updateUserStore(userData);
    console.log("User Data", userData);
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <BodyText style={styles.infoText}>
          Awesome Nomad! Welcome to the world of Trodden. Tell us more about
          you....
        </BodyText>
        <BodyText>Country</BodyText>
        <CountryPicker onSelect={handleCountryPick} value={countryInput} />
        <BodyText>Contact</BodyText>
        <CallingCodePicker
          onSelect={handleCountryCodePick}
          value={countrycodeInput}
          inputValue={contactInput}
          onChangeText={handleContactInput}
        />
        <BodyText>Birthday</BodyText>
        <InputBox
          onFocus={handleShowDatePicker}
          onChange={handleShowDatePicker}
          ref={datePickInput}
          value={birthdateOutput}
          placeholder="When is your your cake day?"
        />
        <DatePickerModel
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleBirthdateInput}
          onCancel={handleHideDatePicker}
        />
        <BodyText>Gender</BodyText>
        <View style={styles.genderPicker}>
          <Picker
            selectedValue={genderInput}
            onValueChange={(itemValue, itemIndex) =>
              handleGenderInput(itemValue, itemIndex)
            }
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        <BigButton
          style={styles.button}
          onPress={() =>
            handleOnSubmitNext(
              countrycodeInput,
              contactInput,
              regionInput,
              countryInput,
              birthdateInput,
              genderInput
            )
          }
        >
          Next
        </BigButton>
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
  genderPicker: {
    height: 50,
    borderColor: Colors.outline,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
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
