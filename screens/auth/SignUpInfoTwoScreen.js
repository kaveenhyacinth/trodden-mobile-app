import React, { useState, useEffect, useReducer } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { storeGuest } from "../../redux";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ui/ScreenView";
import BigButton from "../../components/ui/BigButton";
import LoadingButton from "../../components/ui/LoadingButton";
import BodyText from "../../components/ui/BodyText";
import ImageUploader from "../../components/ui/ImageUploader";
import InputBox from "../../components/ui/InputBox";
import FormContainer from "../../components/ui/FormContainer";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const INFO_TWO_FORM_UPDATE = "INFO_TWO_FORM_UPDATE";

const formReducer = (state, action) => {
  if (action.type === INFO_TWO_FORM_UPDATE) {
    const updatedValues = {
      ...state.initialValues,
      [action.payload.key]: action.payload.value,
    };
    const updatedValidities = {
      ...state.initialValidities,
      [action.payload.key]: action.payload.validation.validity,
    };
    const updatedErrorMsgs = {
      ...state.errorMsgs,
      [action.payload.key]: action.payload.validation.msg,
    };

    return {
      ...state,
      initialValues: updatedValues,
      initialValidities: updatedValidities,
      errorMsgs: updatedErrorMsgs,
    };
  }
  return state;
};

const validationSchema = yup.object().shape({
  bio: yup
    .string()
    .min(50, "Too short! Keep it descriptive...")
    .max(150, "Too long! Keep it short..."),
  occupation: yup.string().matches(/^[A-z\s]+$/, "Field value is invalid!"),
});

const SignupInfoTwoScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState({});
  const [formState, dispatchFormState] = useReducer(formReducer, {
    initialValues: {
      bio: "",
      occupation: "",
    },
    initialValidities: {
      bio: false,
      occupation: false,
    },
    errorMsgs: {
      bio: "",
      occupation: "",
    },
  });

  const dispatch = useDispatch();

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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageFile((prevState) => ({ ...prevState, ...result }));
    }
  };

  const handleValidation = async (inputValue, inputKey) => {
    try {
      const result = await validationSchema.validate({
        [inputKey]: inputValue,
      });
      const key = Object.keys(result);
      dispatchFormState({
        type: INFO_TWO_FORM_UPDATE,
        payload: {
          key,
          value: result[key],
          validation: {
            validity: true,
            msg: "",
          },
        },
      });
    } catch (error) {
      dispatchFormState({
        type: INFO_TWO_FORM_UPDATE,
        payload: {
          key: inputKey,
          value: inputValue,
          validation: {
            validity: false,
            msg: error.message,
          },
        },
      });
    }
  };

  const handleInput = (value) => async (key) => {
    let validation = { validity: true, msg: "" };

    if (value === null || value === undefined || value === "") {
      validation = { validity: false, msg: "Don't leave empty" };
      dispatchFormState({
        type: INFO_TWO_FORM_UPDATE,
        payload: {
          value,
          key,
          validation,
        },
      });
    } else {
      await handleValidation(value, key);
    }
  };

  const handleUserStoreUpdate = (userData) => {
    dispatch(storeGuest(userData));
  };

  const handleSubmit = async () => {
    const formData = formState.initialValues;
    const formValidation = formState.initialValidities;

    try {
      setLoading(true);

      const isValid = formValidation.bio && formValidation.occupation;

      if (!isValid)
        throw new Error("Invalid inputs detected. Please re-try...");
      if (!imageFile.uri) throw new Error("Please upload your profile image");

      // Get file type
      const fileType = imageFile.uri.split(".").pop();

      // Format occupation input
      const words = formData.occupation.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
      }
      const occupation = words.join(" ");

      // Prepare image data
      const userData = {
        bio: formData.bio,
        occupation: occupation,
        ImageDataUri: imageFile.uri,
        ImageDataName: `image.${fileType}`,
        ImageDataType: `image/${fileType}`,
      };

      // Update store
      handleUserStoreUpdate(userData);

      // navigate to interests
      props.navigation.replace("selectInterests");
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView>
      <FormContainer>
        <ImageUploader
          style={styles.imageUploader}
          onUpload={handleSelectImage}
          image={imageFile.uri ?? "https://bit.ly/3t7hmNd"}
        />
        <InputBox
          multiline={true}
          style={styles.inputArea}
          placeholder="Bio"
          message={formState.errorMsgs.bio}
          value={formState.initialValues.bio}
          returnKeyType="none"
          onChangeText={(inputText) => handleInput(inputText)("bio")}
        />
        <InputBox
          style={styles.input}
          placeholder="Currently work as ..."
          message={formState.errorMsgs.occupation}
          value={formState.initialValues.occupation}
          onChangeText={(inputText) => handleInput(inputText)("occupation")}
        />
        {loading ? (
          <LoadingButton />
        ) : (
          <BigButton style={styles.button} onPress={handleSubmit}>
            Next
          </BigButton>
        )}
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
