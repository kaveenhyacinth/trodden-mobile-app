import React, { useState, useEffect, useCallback } from "react";
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
import { Video } from "expo-av";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { fetchNomadMemories } from "../../redux";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { downloadImage } from "../../helpers/mediaHandler";
import api from "../../api";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ui/ScreenView";
import BodyText from "../../components/ui/BodyText";
import InputBox from "../../components/ui/InputBox";
import HeaderButton from "../../components/ui/CustomHeaderButton";
import MemoImagePreview from "../../components/modals/MemoImagePreviewModal";
import PlaceSearch from "../../components/modals/PlaceSearchBottomSheet";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

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

  const dispatch = useDispatch();

  const nomadStore = useSelector((state) => state.nomadStore);

  useEffect(() => {
    renderHeaderButton(isPostReady, loading);
  }, [renderHeaderButton, isPostReady, loading]);

  useEffect(() => {
    const checkIsPostReady = () => {
      if (images.length === 0 && video.length === 0)
        return setIsPostReady(false);
      if (content.length < 5) return setIsPostReady(false);
      return setIsPostReady(true);
    };
    checkIsPostReady();
  }, [images, video, content]);

  const renderHeaderButton = useCallback(
    (isPostReady, loading) => {
      props.navigation.setOptions({
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {loading ? (
              <Item
                title="POSTING..."
                color={Colors.primary}
                onPress={() => {}}
              />
            ) : (
              <Item
                title="POST"
                color={isPostReady ? Colors.primary : Colors.outline}
                onPress={isPostReady ? () => handleSubmit() : null}
              />
            )}
          </HeaderButtons>
        ),
      });
    },
    [loading]
  );

  const renderSelcetedItems = () => {
    if (video.length !== 0 && images.length === 0) {
      return (
        <View style={styles.videoContainer}>
          {video.map((item) => (
            <React.Fragment key={Math.random()}>
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
                  key={Math.random()}
                  style={styles.videoTrash}
                  onPress={() =>
                    setVideo((prevState) =>
                      prevState.filter((pick) => pick.uri !== item.uri)
                    )
                  }
                >
                  <Ionicons
                    key={Math.random()}
                    name="close-circle"
                    size={20}
                    color={Colors.accent}
                  />
                </Pressable>
              </View>
            </React.Fragment>
          ))}
        </View>
      );
    } else {
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
    }
  };

  const renderActionButtons = () => {
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
      if (images.length < 8) {
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

  // const renderSendButton = () => {
  //   if (!isPostReady)
  //     return <Ionicons name="send" size={30} color={Colors.outline} />;

  //   if (loading)
  //     return <ActivityIndicator size="large" color={Colors.primary} />;
  //   return (
  //     <Pressable onPress={handleSubmit}>
  //       <Ionicons name="send" size={30} color={Colors.primary} />
  //     </Pressable>
  //   );
  // };

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
        quality: 0.7,
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
        aspect: [1, 1],
        quality: 0.5,
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
        quality: 0.7,
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
    try {
      console.log("Inside handle submit");
      setLoading(true);
      const userId = await Fetch("nomadId");
      let mediaBody = new FormData();
      let mediaArray = [];

      console.log("Still inside!", images);

      if ((images.length === 0 && video.length === 0) || !content) return;

      console.log("Still inside!!");

      // Upload media only if media files exist
      if (images.length !== 0 || video.length !== 0) {
        const isImage =
          images.length !== 0 && video.length === 0 ? true : false;
        const mediaFiles = isImage ? images : video;
        const fieldName = isImage ? "images[]" : "videos[]";

        mediaFiles.map((media) => {
          let fileType = media.uri.split(".").pop();
          mediaBody.append(fieldName, {
            uri: media.uri,
            type: `${media.type}/${fileType}`,
            name: `${media.type}.${fileType}`,
          });
        });

        const config = {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        };

        const mediaRes = isImage
          ? await api.post.uploadImages(mediaBody)(config)
          : await api.post.uploadVideos(mediaBody)(config);

        if (!mediaRes.data.result)
          throw new Error("Couldn't upload images eh!");

        const resArray = mediaRes.data.result;
        console.log("Media upload Array", resArray);

        resArray.map((resObj) => {
          const mediaObj = {
            uri: resObj.filename,
            type: resObj.contentType,
          };
          mediaArray.push(mediaObj);
        });
      }

      const memoBody = {
        userId,
        content,
        media: mediaArray,
        destination: {
          id: location.id,
          name: location.name,
          types: location.types,
        },
      };

      const response = await api.post.createMemo(memoBody);
      if (!response.data)
        throw new Error(
          "Something went wrong while creating the memory! Please try again later..."
        );

      await fetchNomadMemories(userId)(dispatch);

      props.navigation.goBack();
    } catch (error) {
      ErrorAlertModal("Error Happen when creating new memory", error);
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
              source={{ uri: downloadImage(nomadStore.data.prof_img) }}
              style={styles.headerImage}
            />
          </View>
        </View>
        <View style={styles.sharePrefWrapper}>
          <BodyText
            style={styles.NomadName}
          >{`${nomadStore.data.first_name} ${nomadStore.data.last_name}`}</BodyText>
          <BodyText
            style={styles.NomadLocation}
            onPress={() => setIsLocationModelOpen(true)}
          >
            {location.name ?? "Tag a location..."}
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
          {renderSelcetedItems()}
        </ScrollView>
      </View>
      <View style={styles.actionAreaContainer}>
        <View style={styles.actionUploadWrapper}>{renderActionButtons()}</View>
        {/* <View style={styles.actionSendWrapper}>{renderSendButton()}</View> */}
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
    height: WINDOW_HEIGHT * 0.1,
    width: WINDOW_WIDTH,
    alignItems: "center",
  },
  //#endregion

  //#region Header image styles
  imageContainer: {
    height: "100%",
    width: WINDOW_WIDTH * 0.2,
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
    width: WINDOW_WIDTH * 0.8,
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
    height: WINDOW_HEIGHT * 0.45,
    width: WINDOW_WIDTH,
  },
  inputArea: {
    height: WINDOW_HEIGHT * 0.4,
    textAlignVertical: "top",
    paddingVertical: 10,
    borderWidth: 0,
  },
  //#endregion

  //#region Selected items styles
  selectedItemsAreaContainer: {
    height: WINDOW_HEIGHT * 0.2,
    width: WINDOW_WIDTH,
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
    width: WINDOW_HEIGHT * 0.25,
    height: WINDOW_HEIGHT * 0.18,
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
    height: WINDOW_HEIGHT * 0.15,
    width: WINDOW_HEIGHT * 0.15,
  },
  //#endregion

  //#region  Action bar styles
  actionAreaContainer: {
    flexDirection: "row",
    height: WINDOW_HEIGHT * 0.1,
    width: WINDOW_WIDTH,
    borderTopColor: Colors.outline,
    borderTopWidth: 1,
  },
  actionUploadWrapper: {
    width: WINDOW_WIDTH * 0.5,
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
