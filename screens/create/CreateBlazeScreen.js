import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import DatePickerModel from "react-native-modal-datetime-picker";
import ScreenView from "../../components/ui/ScreenView";
import InputBox from "../../components/ui/InputBox";
import LoadingButton from "../../components/ui/LoadingButton";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import BigButton from "../../components/ui/BigButton";
import FormContainer from "../../components/ui/FormContainer";
import api from "../../api";
import { Fetch } from "../../helpers/deviceStorageHandler";
import Colors from "../../theme/Colors";
import BodyText from "../../components/ui/BodyText";
import Typography from "../../theme/Typography";
import PlaceSearch from "../../components/modals/PlaceSearchBottomSheet";

const API_KEY = Constants.manifest.extra.PLACE_API_KEY;
const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const CreateBlazeScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setiIsDatePickerVisible] = useState(false);
  const [isLocationModelOpen, setIsLocationModelOpen] = useState(false);
  const [blazeName, setBlazeName] = useState("");
  const [blazeDesc, setBlazeDesc] = useState("");
  const [blazeDateIn, setBlazeDateIn] = useState("");
  const [blazeDateOut, setBlazeDateOut] = useState("");
  const [imageFile, setImageFile] = useState({});
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
        const loc = `${value.terms[0].value}, ${
          value.terms[value.terms.length - 1].value
        }`;
        setLocation((prevState) => ({
          ...prevState,
          name: loc,
          id: value.place_id,
          types: value.types,
        }));
        setIsLocationModelOpen(false);
        break;
      default:
        return null;
    }
  };

  const handleRequestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera roll permission to proceed",
        [
          {
            text: "Re-enter",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    return true;
  };

  const handleSelectImage = async () => {
    const hasPermission = await handleRequestPermission();
    if (!hasPermission) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImageFile((prevState) => ({ ...prevState, ...result }));
    }
  };

  const handleUploadImage = async (body) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.post.uploadImage(body)(config);
      console.log("Image file path", response.data.result);

      // Check response success
      if (!response.data.result)
        throw new Error(
          "Something went wrong while saving the profile picture! Please try again later..."
        );

      return response.data.result.filename;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!imageFile.uri) throw new Error("Please upload your Blaze poster");

      const userId = await Fetch("nomadId");

      // Get file type
      const fileType = imageFile.uri.split(".").pop();

      // Upload image
      const ImageBody = new FormData();
      ImageBody.append("image", {
        uri: imageFile.uri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      const filename = await handleUploadImage(ImageBody);
      if (!filename)
        throw new Error(
          "Something went wrong while saving the Blaze Poster! Please try again later..."
        );

      const body = {
        userId,
        caravanId: route.params.id,
        title: blazeName,
        desc: blazeDesc,
        date: blazeDateIn,
        location: {
          id: location.id,
          name: location.name,
          types: location.types,
        },
        filename,
      };

      const response = await api.post.createBlaze(body);

      if (!response)
        throw new Error(
          "Something went wrong while creating Blaze! Please try again later..."
        );

      navigation.goBack();
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView>
      <FormContainer>
        <Pressable onPress={handleSelectImage}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{ uri: imageFile.uri ?? "https://cut.ly/ZSvwBlu" }}
            />
          </View>
        </Pressable>
        <BodyText onPress={handleSelectImage} style={styles.infotext}>
          Upload
        </BodyText>
        <InputBox
          placeholder="Blaze Title"
          value={blazeName}
          onChangeText={(value) => handleInput(value)("name")}
        />
        <InputBox
          placeholder="Description (Please include date, time, location, equipments and other essential details for the Nomads who participates the Blaze)"
          value={blazeDesc}
          onChangeText={(value) => handleInput(value)("desc")}
          multiline={true}
          style={styles.inputArea}
        />
        <BigButton
          style={styles.dateBtn}
          textStyle={styles.dateTxt}
          onPress={handleShowDatePicker}
        >
          {blazeDateOut || "Select Date"}
        </BigButton>
        <DatePickerModel
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => handleInput(date)("date")}
          onCancel={handleHideDatePicker}
        />
        <BigButton
          style={styles.dateBtn}
          textStyle={styles.dateTxt}
          onPress={() => setIsLocationModelOpen(true)}
        >
          {location.name || "Select Location"}
        </BigButton>
        <Modal
          visible={isLocationModelOpen}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsLocationModelOpen(false)}
        >
          <Pressable
            onPress={() => setIsLocationModelOpen(false)}
            style={{ flex: 1, backgroundColor: Colors.backgroundOverlay }}
          ></Pressable>
          <PlaceSearch
            onPress={(data, details = null) => handleInput(data)("location")}
          />
        </Modal>
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton style={styles.button} onPress={handleSubmit}>
            Publish
          </BigButton>
        )}
      </FormContainer>
    </ScreenView>
  );
};

export default CreateBlazeScreen;

const styles = StyleSheet.create({
  imageWrapper: {
    width: WINDOW_WIDTH - 40,
    height: ((WINDOW_WIDTH - 40) / 16) * 9,
  },
  image: {
    flex: 1,
  },
  infotext: {
    fontSize: 14,
    color: Colors.accent,
    alignSelf: "flex-end",
    marginTop: -35,
    marginBottom: 20,
    marginRight: 10,
    backgroundColor: Colors.textOverlay,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  inputArea: {
    height: 100,
    textAlignVertical: "top",
    paddingVertical: 5,
  },
  dateBtn: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.outline,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateTxt: {
    ...Typography.bodyText,
    color: "#bbb",
    fontSize: 14,
    fontWeight: "normal",
    alignSelf: "flex-start",
    textTransform: "none",
  },
});
