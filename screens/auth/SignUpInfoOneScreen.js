import React, { useState, useReducer } from "react";
import * as yup from "yup";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import DatePickerModel from "react-native-modal-datetime-picker";
import { storeUser } from "../../store/actions/storeUser";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ui/ScreenView";
import BodyText from "../../components/ui/BodyText";
import InputBox from "../../components/ui/InputBox";
import CountryPicker from "../../components/ui/CountryPicker";
import CallingCodePicker from "../../components/ui/CallingCodePicker";
import BigButton from "../../components/ui/BigButton";
import LoadingButton from "../../components/ui/LoadingButton";
import FormContainer from "../../components/ui/FormContainer";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const INFO_ONE_FORM_UPDATE = "INFO_ONE_FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === INFO_ONE_FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.payload.key]: action.payload.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.payload.key]: action.payload.validation.validity,
    };
    const updatedErrorMsgs = {
      ...state.errorMsgs,
      [action.payload.key]: action.payload.validation.msg,
    };

    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      errorMsgs: updatedErrorMsgs,
    };
  }

  return state;
};

const validationSchema = yup.object().shape({
  city: yup
    .string()
    .matches(/^[A-z]+$/, "Value for the City field is invalid!"),
  country: yup.string(),
  region: yup.string(),
  callingCode: yup.string(),
  contact: yup
    .string()
    .min(7, "Too short!")
    .max(12, "Too long! Enter a valid contact number"),
  birthdate: yup.string(),
  gender: yup.string(),
});

const SignupInfoOneScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [birthdateOutput, setBirthdateOutput] = useState();
  const [isDatePickerVisible, setiIsDatePickerVisible] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      city: "",
      country: undefined,
      region: "",
      callingCode: undefined,
      contact: "",
      birthdate: "",
      gender: "",
    },
    inputValidities: {
      city: false,
      country: false,
      region: false,
      callingCode: false,
      contact: false,
      birthdate: false,
      gender: false,
    },
    errorMsgs: {
      city: "",
      country: "",
      region: "",
      callingCode: "",
      contact: "",
      birthdate: "",
      gender: "",
    },
  });

  const dispatch = useDispatch();

  const handleValidation = async (inputValue, inputKey) => {
    try {
      const result = await validationSchema.validate({
        [inputKey]: inputValue,
      });

      const key = Object.keys(result);

      dispatchFormState({
        type: INFO_ONE_FORM_UPDATE,
        payload: {
          key,
          value: result[key],
          validation: {
            validity: true,
            msg: "",
          },
        },
      });
    } catch (err) {
      dispatchFormState({
        type: INFO_ONE_FORM_UPDATE,
        payload: {
          key: inputKey,
          value: inputValue,
          validation: {
            validity: false,
            msg: err.message,
          },
        },
      });
    }
  };

  const handleInput = async (value, key) => {
    let validation = { validity: true, msg: "" };

    // Check is the field is empty
    if (value === null || value === undefined || value === "") {
      validation = { validity: false, msg: "Don't leave empty" };
      dispatchFormState({
        type: INFO_ONE_FORM_UPDATE,
        payload: {
          value,
          key,
          validation,
        },
      });
    } else {
      if (key === "birthdate") {
        const stringDate = `${value.getDate()}/${
          value.getMonth() + 1
        }/${value.getFullYear()}`;
        setBirthdateOutput(stringDate);
        handleHideDatePicker();
      }

      await handleValidation(value, key);
    }
  };

  const handleCountryPick = (country) => {
    handleInput(country.name, "country");
    handleInput(country.region, "region");
    handleInput(country.callingCode[0], "callingCode");
  };

  const handleShowDatePicker = () => {
    setiIsDatePickerVisible(true);
  };

  const handleHideDatePicker = () => {
    setiIsDatePickerVisible(false);
  };

  const handleUserStoreUpdate = (userData) => {
    dispatch(storeUser(userData));
  };

  const handleSubmit = async () => {
    const formData = formState.inputValues;
    const formValidation = formState.inputValidities;

    try {
      setLoading(true);

      const isValid =
        formValidation.city &&
        formValidation.country &&
        formValidation.region &&
        formValidation.callingCode &&
        formValidation.contact &&
        formValidation.birthdate &&
        formValidation.gender;

      if (!isValid)
        throw new Error("Invalid inputs detected. Please re-try...");

      const age =
        new Date().getFullYear() - new Date(formData.birthdate).getFullYear();

      if (age < 18) throw new Error("You should be at least 18 years old...");

      const userData = {
        city: formData.city,
        country: formData.country,
        region: formData.region,
        contact: `${formData.callingCode}${formData.contact}`,
        birthdate: formData.birthdate,
        gender: formData.gender,
      };

      handleUserStoreUpdate(userData);

      props.navigation.replace("signupInfoTwo");
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <FormContainer>
        <BodyText style={styles.infoText}>
          Awesome Nomad! Welcome to the world of Trodden. Tell us more about
          you....
        </BodyText>
        <BodyText>City</BodyText>
        <InputBox
          onChangeText={(value) => handleInput(value, "city")}
          value={formState.inputValues.city}
          message={formState.errorMsgs.city ?? ""}
          placeholder="What is your home town?"
        />
        <BodyText>Country</BodyText>
        <CountryPicker
          onSelect={handleCountryPick}
          value={formState.inputValues.country}
        />
        <BodyText>Contact</BodyText>
        <CallingCodePicker
          value={formState.inputValues.callingCode}
          onSelect={(country) =>
            handleInput(country.callingCode[0], "callingCode")
          }
          inputValue={formState.inputValues.contact}
          onChangeText={(value) => handleInput(value, "contact")}
          message={formState.errorMsgs.contact}
        />
        <BodyText>Birthday</BodyText>
        <BigButton
          style={styles.bdayBtn}
          textStyle={styles.bdayTxt}
          onPress={handleShowDatePicker}
        >
          {birthdateOutput ?? "When is your cake day?"}
        </BigButton>
        <DatePickerModel
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => handleInput(date, "birthdate")}
          onCancel={handleHideDatePicker}
        />
        <BodyText>Gender</BodyText>
        <View style={styles.genderPicker}>
          <Picker
            selectedValue={formState.inputValues.gender}
            onValueChange={(itemValue, itemIndex) =>
              handleInput(itemValue, "gender")
            }
          >
            <Picker.Item label="--Select--" value={undefined} />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton style={styles.button} onPress={() => handleSubmit()}>
            Next
          </BigButton>
        )}
      </FormContainer>
      <View style={{ flexDirection: "row" }}>
        <BodyText style={styles.active}>-</BodyText>
        <BodyText style={styles.next}>-</BodyText>
        <BodyText style={styles.next}>-</BodyText>
      </View>
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
  bdayBtn: {
    height: 50,
    backgroundColor: Colors.accent,
    borderColor: Colors.outline,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  bdayTxt: {
    ...Typography.placeholderText,
    textAlign: "left",
  },
  genderPicker: {
    height: 50,
    borderColor: Colors.outline,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 30,
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  active: {
    ...Typography.bodyText,
    alignItems: "flex-end",
    backgroundColor: Colors.primary,
    height: 3,
    width: 20,
    marginHorizontal: 3,
  },
  next: {
    ...Typography.bodyText,
    alignItems: "flex-end",
    backgroundColor: Colors.outline,
    height: 3,
    width: 20,
    marginHorizontal: 3,
  },
});

export default SignupInfoOneScreen;
