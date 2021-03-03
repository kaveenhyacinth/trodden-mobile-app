import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Http from "../api/kit";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BigButton from "../components/BigButton";
import BodyText from "../components/BodyText";
import ImageUploader from "../components/ImageUploader";
import InputBox from "../components/InputBox";
import FormContainer from "../components/FormContainer";

const SignupInfoTwoScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    occupation: "",
  });
  const [imageFile, setImageFile] = useState({});

  useEffect(() => console.log(imageFile), [imageFile]);

  const requestPermission = async () => {
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

    if (!result.cancelled) {
      setImageFile((prevState) => ({ ...prevState, ...result }));
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

  // TODO: Move to interests sacreen
  const uploadImage = async () => {
    try {
      setLoading(true);

      const fileType = imageFile.uri.split(".").pop();

      const body = new FormData();
      body.append("image", {
        uri: imageFile.uri,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await Http.post("/image/add", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image file path", response.data.result);



    } catch (error) {
      console.warn(error);
    } finally {
      console.log("Done!");
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
          // onPress={() => {
          //   {
          //     props.navigation.navigate("selectInterests");
          //   }
          // }}
          onPress={uploadImage}
        >
          Next
        </BigButton>
      </FormContainer>
      <View style={{ flexDirection: "row" }}>
        <BodyText style={styles.active}>-</BodyText>
        <BodyText style={styles.active}>-</BodyText>
        <BodyText style={styles.next}>-</BodyText>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    height: 200,
    textAlignVertical: "top",
    paddingVertical: 10,
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

export default SignupInfoTwoScreen;
