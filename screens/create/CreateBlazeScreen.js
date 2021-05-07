import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import DatePickerModel from "react-native-modal-datetime-picker";
import ScreenView from "../../components/ui/ScreenView";
import InputBox from "../../components/ui/InputBox";
import LoadingButton from "../../components/ui/LoadingButton";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import BigButton from "../../components/ui/BigButton";
import ImageUploader from "../../components/ui/ImageUploader";
import FormContainer from "../../components/ui/FormContainer";

const API_KEY = Constants.manifest.extra.PLACE_API_KEY;

const CreateBlazeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setiIsDatePickerVisible] = useState(false);
  const [blazeName, setBlazeName] = useState("");
  const [blazeDesc, setBlazeDesc] = useState("");
  const [blazeDateIn, setBlazeDateIn] = useState("");
  const [blazeDateOut, setBlazeDateOut] = useState("");
  const [location, setLocation] = useState({
    name: undefined,
    id: undefined,
    types: [],
  });

  const handleShowDatePicker = () => {
    setiIsDatePickerVisible(true);
  };

  const handleHideDatePicker = () => {
    setiIsDatePickerVisible(false);
  };

  const handleInput = (value) => (key) => {
    switch (key) {
      case "name":
        setBlazeName(value);
        break;
      case "desc":
        setBlazeDesc(value);
        break;
      case "date":
        setBlazeDateIn(value);
        setBlazeDateOut(
          `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`
        );
        handleHideDatePicker();
        break;
      case "location":
        const loc = `${data.terms[0].value}, ${
          data.terms[data.terms.length - 1].value
        }`;
        setLocation((prevState) => ({
          ...prevState,
          name: loc,
          id: data.place_id,
          types: data.types,
        }));
        break;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("Under construction");
  };

  return (
    <ScreenView>
      <FormContainer>
        <ImageUploader />
        <InputBox
          placeholder="Blaze Name"
          value={blazeName}
          onChangeText={(value) => handleInput(value)("name")}
        />
        <InputBox
          placeholder="Description"
          value={blazeDesc}
          onChangeText={(value) => handleInput(value)("desc")}
          multiline={true}
        />
        <BigButton
          style={styles.bdayBtn}
          textStyle={styles.bdayTxt}
          onPress={handleShowDatePicker}
        >
          {blazeDateOut ?? "Select Date"}
        </BigButton>
        <DatePickerModel
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => handleInput(date)("date")}
          onCancel={handleHideDatePicker}
        />
        <GooglePlacesAutocomplete
          placeholder={"Select the destination"}
          onPress={(data, details = null) => handleInput(data)("location")}
          query={{
            key: API_KEY,
            language: "en",
          }}
          styles={{
            textInput: {
              borderColor: Colors.outline,
              borderWidth: 2,
            },
          }}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton style={styles.button} onPress={handleSubmit}>
            Create
          </BigButton>
        )}
      </FormContainer>
    </ScreenView>
  );
};

export default CreateBlazeScreen;

const styles = StyleSheet.create({});
