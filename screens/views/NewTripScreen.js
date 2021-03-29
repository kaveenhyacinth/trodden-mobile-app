import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Modal,
  Alert,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Fetch } from "../../services/deviceStorage";
import { downloadImage } from "../../services/mediaService";
import api from "../../api/api";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ScreenView";
import BodyText from "../../components/BodyText";
import InputBox from "../../components/InputBox";
import HeaderButton from "../../components/HeaderButton";
import MemoImagePreview from "../../components/MemoImagePreview";
import PlaceSearch from "../../components/PlaceSearchBottomSheet";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const NewTripScreen = (props) => {
  const nomadStore = useSelector((state) => state.nomadStore);

  return (
    <ScreenView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: downloadImage(nomadStore.prof_img) }}
              style={styles.headerImage}
            />
          </View>
        </View>
        <View style={styles.sharePrefWrapper}>
          <BodyText
            style={styles.NomadName}
          >{`${nomadStore.first_name} ${nomadStore.last_name}`}</BodyText>
          <BodyText style={styles.NomadLocation} onPress={() => {}}>
            {"Tag a location..."}
          </BodyText>
        </View>
      </View>
      <InputBox
        style={styles.inputArea}
        containerStyle={styles.inputAreaContainer}
        onChangeText={(value) => {}}
        value={"HI"}
        placeholder="Share your memories with Trodden..."
        multiline={true}
        returnKeyType="none"
      />
      <View style={styles.selectedItemsAreaContainer}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          horizontal
        ></ScrollView>
      </View>
      <View style={styles.actionAreaContainer}>
        <View style={styles.actionUploadWrapper}></View>
        {/* <View style={styles.actionSendWrapper}>{renderSendButton()}</View> */}
      </View>
      <Modal
        visible={false}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <Pressable
          onPress={() => {}}
          style={{ flex: 1, backgroundColor: Colors.backgroundOverlay }}
        ></Pressable>
        <PlaceSearch onPress={() => {}} />
      </Modal>
    </ScreenView>
  );
};

export default NewTripScreen;

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
