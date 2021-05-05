import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchInterests } from "../../redux";
import * as ImagePicker from "expo-image-picker";
import { Fetch } from "../../helpers/deviceStorageHandler";
import ScreenView from "../../components/ui/ScreenView";
import BigButton from "../../components/ui/BigButton";
import InputBox from "../../components/ui/InputBox";
import ImageUploader from "../../components/ui/ImageUploader";
import BodyText from "../../components/ui/BodyText";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";
import InterestGridTile from "../../components/modals/InterestTileModal";
import LoadingScreen from "../info/LoadingScreen";
import api from "../../api";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const FIELD_WIDTH = WINDOW_WIDTH - 30;

const CreateCaravan = ({ navigation }) => {
  const [imageFile, setImageFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [caravanName, setCaravanName] = useState("");
  const [caravanDescription, setCaravanDescription] = useState("");

  const interetsStore = useSelector((state) => state.interestsStore);

  const dispatch = useDispatch();

  const fetchInterestsFromApi = useCallback(async () => {
    try {
      await fetchInterests()(dispatch);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  }, []);

  const handleInput = (inputText) => (key) => {
    switch (key) {
      case "name":
        setCaravanName(inputText);
        break;
      case "desc":
        setCaravanDescription(inputText);
        break;
      default:
        break;
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
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageFile((prevState) => ({ ...prevState, ...result }));
    }
  };

  const checkIsValidSelection = () => {
    const selectionCount = selectedInterests.length;
    if (selectionCount < 3) return false;
    return true;
  };

  const handleSelectInterests = (id) => {
    const prevSelectedInterest = selectedInterests.find(
      (interest) => interest === id
    );

    if (prevSelectedInterest !== undefined) {
      setSelectedInterests((prevState) =>
        prevState.filter((interest) => interest !== id)
      );
    } else {
      setSelectedInterests((prevState) => [...prevState, id]);
    }
  };

  const renderInterests = () => {
    if (interetsStore === []) return null;
    return interetsStore.data.map((item) => (
      <InterestGridTile
        key={item._id.toString()}
        title={item.title}
        imageUrl={item.image}
        onSelect={() => handleSelectInterests(item._id)}
        style={styles.gridTile}
      />
    ));
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
      const isValid = checkIsValidSelection();
      if (!isValid)
        throw new Error("Please select at least 3 interests to proceed...");

      if (!imageFile.uri) throw new Error("Please upload your profile image");

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
          "Something went wrong while saving the Caravan DP! Please try again later..."
        );

      const userId = await Fetch("nomadId");

      const body = {
        userId,
        caravanName,
        filename,
        caravanDescription,
        interests: selectedInterests,
      };

      const response = await api.post.createCaravan(body);

      if (!response)
        throw new Error(
          "Something went wrong while creating Caravan! Please try again later..."
        );

      navigation.goBack();
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterestsFromApi();
  }, [fetchInterestsFromApi]);

  if (interetsStore.loading) return <LoadingScreen />;
  if (interetsStore.error) return ErrorAlertModal(interetsStore.error, null);

  return (
    <ScreenView style={styles.screen}>
      <ImageUploader
        style={styles.imageUploader}
        onUpload={handleSelectImage}
        image={imageFile.uri ?? "https://cut.ly/ZSvwBlu"}
      />
      <InputBox
        style={styles.inputBox}
        placeholder="Caravan Name"
        value={caravanName}
        onChangeText={(inputText) => handleInput(inputText)("name")}
      />
      <InputBox
        multiline={true}
        style={styles.inputArea}
        placeholder="Description"
        value={caravanDescription}
        returnKeyType="none"
        onChangeText={(inputText) => handleInput(inputText)("desc")}
      />
      <BodyText>Select at least 3 interests</BodyText>
      {renderInterests()}
      <BigButton style={styles.button} onPress={handleSubmit}>
        Create Caravan
      </BigButton>
    </ScreenView>
  );
};

export default CreateCaravan;

const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
  },
  imageUploader: {
    marginBottom: 20,
    width: FIELD_WIDTH,
  },
  inputBox: {
    width: FIELD_WIDTH,
    marginLeft: 15,
  },
  inputArea: {
    height: 150,
    width: FIELD_WIDTH,
    marginLeft: 15,
    textAlignVertical: "top",
    paddingVertical: 10,
  },
  gridTile: {
    width: FIELD_WIDTH,
  },
  button: {
    width: FIELD_WIDTH,
  },
});
