//#region Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Modal,
  Alert,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video, AVPlaybackStatus } from "expo-av";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ScreenView";
import BodyText from "../../components/BodyText";
import InputBox from "../../components/InputBox";
import MemoImagePreview from "../../components/MemoImagePreview";
import PlaceSearch from "../../components/PlaceSearchBottomSheet";
//#endregion

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const NewPostScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [isPostReady, setIsPostReady] = useState(false);
  const [isLocationModelOpen, setIsLocationModelOpen] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [location, setLocation] = useState({
    name: undefined,
    id: undefined,
    types: [],
  });

  useEffect(() => {
    checkIsPostReady();
    console.log("Stored Location Data:", location);
    console.log("Stored Content:", content);
  }, [images, video, content]);

  const checkIsPostReady = () => {
    if ((images.length !== 0 || video.length !== 0) && content.length >= 5)
      return setIsPostReady(true);
    return setIsPostReady(false);
  };

  // Request permision for camera roll
  const handleRequestCameraRollPermission = async () => {
    try {
      const getPerm = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (getPerm.granted) return true;

      const reqPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!reqPerm.granted) {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant camera roll permission to proceed",
          [
            {
              text: "Okay",
              style: "destructive",
            },
          ],
          { cancelable: false }
        );
        return false;
      }
      return true;
    } catch (error) {
      return Alert.alert(
        "Something went wrong!",
        error.message,
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  // Request permission for camera
  const handleRequestCameraPermission = async () => {
    try {
      const getPerm = await ImagePicker.getCameraPermissionsAsync();
      if (getPerm.granted) return true;

      const reqPerm = await ImagePicker.requestCameraPermissionsAsync();
      if (!reqPerm.granted) {
        Alert.alert(
          "Insufficient Permissions",
          "You need to grant camera permission to proceed",
          [
            {
              text: "Okay",
              style: "destructive",
            },
          ],
          { cancelable: false }
        );
        return false;
      }
      return true;
    } catch (error) {
      return Alert.alert(
        "Something went wrong!",
        error.message,
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleSelectImage = async () => {
    try {
      const hasPermission = await handleRequestCameraRollPermission();
      if (!hasPermission) {
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("Selected Image:", result); // <-- clg

      if (!result.cancelled) {
        setImages((prevState) => [
          ...prevState,
          { type: result.type, uri: result.uri },
        ]);
      }
    } catch (error) {
      return Alert.alert(
        "Something went wrong!",
        error.message,
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleSelectVideo = async () => {
    try {
      const hasPermission = await handleRequestCameraRollPermission();
      if (!hasPermission) {
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        videoQuality: 0.5,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("Selected Image:", result); // <-- clg

      if (!result.cancelled) {
        setVideo((prevState) => [
          ...prevState,
          { type: result.type, uri: result.uri },
        ]);
      }
    } catch (error) {
      return Alert.alert(
        "Something went wrong!",
        error.message,
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleTakePhoto = async () => {
    try {
      const hasCameraPermission = await handleRequestCameraPermission();
      const hasCameraRollPermission = await handleRequestCameraRollPermission();
      if (!hasCameraPermission || !hasCameraRollPermission) {
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log("Taken Photo:", result); // <-- clg

      if (!result.cancelled) {
        setImages((prevState) => [
          ...prevState,
          { type: result.type, uri: result.uri },
        ]);
      }
    } catch (error) {
      return Alert.alert(
        "Something went wrong!",
        error.message,
        [
          {
            text: "Okay",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleRenderSelcetedItems = () => {
    if (video.length !== 0 && images.length === 0) {
      return (
        <View style={styles.videoContainer}>
          {video.map((item) => (
            <>
              <Video
                key={Math.random()}
                style={styles.video}
                source={{
                  uri: item.uri,
                }}
                useNativeControls
                resizeMode="cover"
                isLooping={false}
              />
              <View key={Math.random()} style={styles.videoTrashWrapper}>
                <Pressable
                  style={styles.videoTrash}
                  onPress={() =>
                    setVideo((prevState) =>
                      prevState.filter((pick) => pick.uri !== item.uri)
                    )
                  }
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={Colors.accent}
                  />
                </Pressable>
              </View>
            </>
          ))}
        </View>
      );
    } else {
      return (
        <>
          {images.map((item) => (
            <MemoImagePreview
              key={images.indexOf(item)}
              source={item.uri}
              onClose={() =>
                setImages((prevState) =>
                  prevState.filter((pick) => pick.uri !== item.uri)
                )
              }
              style={styles.selectedImage}
            />
          ))}
        </>
      );
    }
  };

  const handleRenderActionButtons = () => {
    if (images.length === 0 && video.length === 0) {
      return (
        <>
          <Pressable onPress={handleSelectImage}>
            <Ionicons name="image-outline" size={30} color={Colors.primary} />
          </Pressable>
          <Pressable onPress={handleTakePhoto}>
            <Ionicons name="camera-outline" size={30} color={Colors.primary} />
          </Pressable>
          <Pressable onPress={handleSelectVideo}>
            <Ionicons
              name="videocam-outline"
              size={30}
              color={Colors.primary}
            />
          </Pressable>
          <Pressable onPress={() => setIsLocationModelOpen(true)}>
            <Ionicons
              name="location-outline"
              size={30}
              color={Colors.primary}
            />
          </Pressable>
        </>
      );
    } else if (images.length !== 0) {
      if (images.length < 2) {
        return (
          <>
            <Pressable onPress={handleSelectImage}>
              <Ionicons name="image-outline" size={30} color={Colors.primary} />
            </Pressable>
            <Pressable onPress={handleTakePhoto}>
              <Ionicons
                name="camera-outline"
                size={30}
                color={Colors.primary}
              />
            </Pressable>
            <Ionicons
              name="videocam-outline"
              size={30}
              color={Colors.outline}
            />
            <Pressable onPress={() => setIsLocationModelOpen(true)}>
              <Ionicons
                name="location-outline"
                size={30}
                color={Colors.primary}
              />
            </Pressable>
          </>
        );
      } else {
        return (
          <>
            <Ionicons name="image-outline" size={30} color={Colors.outline} />
            <Ionicons name="camera-outline" size={30} color={Colors.outline} />
            <Ionicons
              name="videocam-outline"
              size={30}
              color={Colors.outline}
            />
            <Pressable onPress={() => setIsLocationModelOpen(true)}>
              <Ionicons
                name="location-outline"
                size={30}
                color={Colors.primary}
              />
            </Pressable>
          </>
        );
      }
    } else {
      return (
        <>
          <Ionicons name="image-outline" size={30} color={Colors.outline} />
          <Ionicons name="camera-outline" size={30} color={Colors.outline} />
          <Ionicons name="videocam-outline" size={30} color={Colors.outline} />
          <Pressable onPress={() => setIsLocationModelOpen(true)}>
            <Ionicons
              name="location-outline"
              size={30}
              color={Colors.primary}
            />
          </Pressable>
        </>
      );
    }
  };

  const handleSelectLocation = (data) => {
    const loc = `${data.terms[0].value}, ${
      data.terms[data.terms.length - 1].value
    }`;
    setLocation((prevState) => ({
      ...prevState,
      name: loc,
      id: data.place_id,
      types: data.types,
    }));
    setIsLocationModelOpen(false);
    console.log(data);
  };

  const handleSubmit = async () => {
    const mediaFiles = images.length !== 0 ? images : video;

    const createMemoBody = {
      content: content,
      media: "",
      destination: {
        id: location.id,
        name: location.name,
        types: location.types,
      },
    };

    try {
      setLoading(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "https://bit.ly/3rbZYXf" }}
              style={styles.headerImage}
            />
          </View>
        </View>
        <View style={styles.sharePrefWrapper}>
          <BodyText style={styles.NomadName}>{"Kaveen Hyacinth"}</BodyText>
          <BodyText style={styles.NomadLocation}>
            {location.name ?? "Tag a location below..."}
          </BodyText>
        </View>
      </View>
      <InputBox
        style={styles.inputArea}
        containerStyle={styles.inputAreaContainer}
        onChangeText={(value) => setContent(value)}
        value={content}
        placeholder="Share your memories with Trodden..."
        multiline={true}
        returnKeyType="none"
      />
      <View style={styles.selectedItemsAreaContainer}>
        <ScrollView contentContainerStyle={styles.scroll} horizontal>
          {handleRenderSelcetedItems()}
        </ScrollView>
      </View>
      <View style={styles.actionAreaContainer}>
        <View style={styles.actionUploadWrapper}>
          {handleRenderActionButtons()}
        </View>
        <View style={styles.actionSendWrapper}>
          {isPostReady ? (
            <Pressable onPress={handleSubmit}>
              <Ionicons name="send" size={30} color={Colors.primary} />
            </Pressable>
          ) : (
            <Ionicons name="send" size={30} color={Colors.outline} />
          )}
        </View>
      </View>
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
          onPress={(data, details = null) => handleSelectLocation(data)}
        />
      </Modal>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.accent,
  },

  //#region Header styles
  header: {
    flexDirection: "row",
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  //#endregion

  //#region Header image styles
  imageContainer: {
    height: "100%",
    width: SCREEN_WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  headerImage: {
    width: 50,
    height: "100%",
  },
  //#endregion

  //#region Header share preference styles
  sharePrefWrapper: {
    width: SCREEN_WIDTH * 0.8,
  },
  NomadName: {
    ...Typography.bodyTextBold,
  },
  NomadLocation: {
    fontSize: 14,
  },
  //#endregion

  //#region Input area styles
  inputAreaContainer: {
    height: SCREEN_HEIGHT * 0.45,
    width: SCREEN_WIDTH,
  },
  inputArea: {
    height: SCREEN_HEIGHT * 0.4,
    textAlignVertical: "top",
    paddingVertical: 10,
    borderWidth: 0,
  },
  //#endregion

  //#region Selected items styles
  selectedItemsAreaContainer: {
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH,
  },
  scroll: {
    flexGrow: 1,
    overflow: "hidden",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  videoContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 5,
  },
  video: {
    alignSelf: "flex-start",
    width: SCREEN_HEIGHT * 0.25,
    height: SCREEN_HEIGHT * 0.18,
  },
  videoTrashWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: -25,
    marginTop: 5,
  },
  videoTrash: {
    backgroundColor: Colors.info,
    borderRadius: 30,
  },
  selectedImage: {
    height: SCREEN_HEIGHT * 0.15,
    width: SCREEN_HEIGHT * 0.15,
  },
  //#endregion

  //#region  Action bar styles
  actionAreaContainer: {
    flexDirection: "row",
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH,
    borderTopColor: Colors.outline,
    borderTopWidth: 1,
  },
  actionUploadWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  actionSendWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  //#endregion
});

export default NewPostScreen;
