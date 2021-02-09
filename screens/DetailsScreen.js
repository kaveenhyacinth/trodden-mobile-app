import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BigButton from "../components/BigButton";
import ImageUploader from "../components/ImageUploader";
import InputBox from "../components/InputBox";
import FormContainer from "../components/FormContainer";

const DetailsScreen = (props) => {
  const [formData, setFormData] = useState({
    imgUrl: null,
    bio: "",
    occupation: "",
  });

  useEffect(() => console.log(formData), [formData]);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera roll permission to proceed",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const selectImageHandler = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setFormData({ ...formData, imgUrl: result.uri });
    }
  };

  const inputHandler = (inputText, field) => {
    switch (field) {
      case "bio":
        setFormData({ ...formData, bio: inputText });
        break;
      case "occupation":
        setFormData({ ...formData, occupation: inputText });
        break;

      default:
        break;
    }
  };

  return (
    <ScreenView>
      <FormContainer>
        <ImageUploader
          style={styles.imageUploader}
          onUpload={selectImageHandler}
          image={formData.imgUrl}
        />
        <InputBox
          multiline={true}
          style={styles.inputArea}
          placeholder="Bio"
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "bio")}
        />
        <InputBox
          style={styles.input}
          placeholder="Currently work as ..."
          message=""
          onChangeText={(inputText) => inputHandler(inputText, "occupation")}
        />
        <BigButton
          style={styles.button}
          onPress={() => {
            {
              props.navigation.navigate("selectInterests");
            }
          }}
        >
          Next
        </BigButton>
      </FormContainer>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    height: 200,
    textAlignVertical: "top",
    paddingVertical: 10
  },
  imageUploader: {
    marginBottom: 20,
  },
  button: {
    width: "100%",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
});

export default DetailsScreen;
