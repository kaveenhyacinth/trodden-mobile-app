import React, { useState } from "react";
import {
  View,
  Image,
  Button,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ScreenView";
import BodyText from "../../components/BodyText";
import InputBox from "../../components/InputBox";
import MemoImagePreview from "../../components/MemoImagePreview";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const NewPostScreen = () => {
  const [images, setImages] = useState([
    { link: "https://bit.ly/3rfCwbA", id: 3 },
    { link: "https://bit.ly/3e9xh9N", id: 1 },
    { link: "https://bit.ly/3qeC7EV", id: 2 },
  ]);

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
          <BodyText style={styles.sharePref}>Public</BodyText>
        </View>
      </View>
      <InputBox
        style={styles.inputArea}
        containerStyle={styles.inputAreaContainer}
        placeholder="Share your memories with trodden..."
        placeholderStyle={{ color: "white" }}
        multiline={true}
        returnKeyType="none"
      />
      <View style={styles.selectedItemsAreaContainer}>
        <ScrollView contentContainerStyle={styles.scroll} horizontal>
          {images.map((item) => (
            <MemoImagePreview
              key={item.id}
              source={item.link}
              onClose={() =>
                setImages((prevState) =>
                  prevState.filter((pick) => pick.id !== item.id)
                )
              }
              style={styles.selectedImage}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.actionAreaContainer}>
        <View style={styles.actionUploadWrapper}>
          <Ionicons name="image-outline" size={30} color={Colors.primary} />
          <Ionicons name="camera-outline" size={30} color={Colors.primary} />
          <Ionicons name="videocam-outline" size={30} color={Colors.primary} />
          <Ionicons name="location-outline" size={30} color={Colors.primary} />
        </View>
        <View style={styles.actionSendWrapper}>
          <Ionicons name="send" size={30} color={Colors.primary} />
        </View>
      </View>
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
  sharePref: {
    fontSize: 16,
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
