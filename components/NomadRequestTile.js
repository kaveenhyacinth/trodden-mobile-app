//#region Imports
import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { storeTempNomad } from "../store/actions/storeTempNomad";
import { downloadImage } from "../services/mediaService";
import { Fetch } from "../services/deviceStorage";
import api from "../api/api";
import Colors from "../theme/Colors";
import BodyText from "./BodyText";
import Typography from "../theme/Typography";
import BigButton from "../components/BigButton";
//#endregion

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const tileHeight = 90;

const nomadRequestTile = (props) => {
  const owner = props.data.owner ?? props.data;

  const dispatch = useDispatch();

  const renderButtons = (type = "regular") => {
    if (type === "suggestion")
      return (
        <View style={styles.lowerDiv}>
          <BigButton style={styles.button} onPress={handleBondRequest}>
            Add
          </BigButton>
          <BigButton
            onPress={() => handleViewProfile(owner._id)}
            style={{ ...styles.button, ...styles.lite }}
            textStyle={{ color: Colors.info }}
          >
            View
          </BigButton>
        </View>
      );
    if (type === "confirm")
      return (
        <View style={styles.lowerDiv}>
          <BigButton style={styles.button} onPress={handleBondAccept}>
            Accept
          </BigButton>
          <BigButton
            style={{ ...styles.button, ...styles.lite }}
            textStyle={{ color: Colors.info }}
            onPress={handleBondReject}
          >
            Cancel
          </BigButton>
        </View>
      );
    return (
      <View style={styles.lowerDiv}>
        <BigButton
          style={styles.button}
          onPress={() => handleViewProfile(owner._id)}
        >
          View
        </BigButton>
        <BigButton
          style={{ ...styles.button, ...styles.lite }}
          textStyle={{ color: Colors.info }}
          onPress={handleBondBreak}
        >
          Remove
        </BigButton>
      </View>
    );
  };

  const handleBondRequest = async () => {
    try {
      const nomadId = await Fetch("nomadId");
      const reqBody = {
        userId: nomadId,
        requestee: owner._id,
      };
      const response = await api.requestBond(reqBody);
      if (!response.data.success)
        throw new Error("Couldn't place bond request");
      props.onRefresh();
    } catch (error) {
      Alert.alert(
        "Oh My trod!",
        error.message ?? "Something went wrong. Please try again later",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      console.log("Error Happen", error);
    }
  };

  const handleBondAccept = async () => {
    try {
      const nomadId = await Fetch("nomadId");
      const reqBody = {
        userId: nomadId,
        requestorId: owner._id,
        requestId: props.data._id,
      };
      const response = await api.acceptBond(reqBody);
      if (!response.data.success)
        throw new Error("Couldn't place bond request");
      props.onRefresh();
    } catch (error) {
      Alert.alert(
        "Oh My trod!",
        error.message ?? "Something went wrong. Please try again later",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      console.log("Error Happen", error);
    }
  };

  // TODO:
  const handleBondReject = async () => {
    alert("Reject");
  };

  //TODO:
  const handleBondBreak = async () => {
    alert("Break");
  };

  // TODO:
  const handleViewProfile = (userId) => {
    dispatch(storeTempNomad(userId));
    props.onNavigate();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.imageWrapper}>
          <Pressable onPress={() => handleViewProfile(owner._id)}>
            <Image
              style={styles.image}
              source={{ uri: downloadImage(owner.prof_img) }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.upperDiv}>
          <BodyText
            style={styles.upperDivText}
            onPress={() => handleViewProfile(owner._id)}
          >{`${owner.first_name} ${owner.last_name}`}</BodyText>
        </View>
        {renderButtons(props.type)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
    height: tileHeight,
    marginVertical: 10,
    backgroundColor: Colors.accent,
  },
  leftSection: {
    height: tileHeight,
    width: tileHeight + 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imageWrapper: {
    width: tileHeight,
    height: tileHeight,
    borderRadius: tileHeight / 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rightSection: {
    height: "100%",
    width: SCREEN_WIDTH - 110,
  },
  upperDiv: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
  },
  upperDivText: {
    ...Typography.bodyTextBold,
  },
  lowerDiv: {
    flex: 2,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    height: 35,
    marginRight: 15,
  },
  lite: {
    backgroundColor: Colors.outline,
    borderColor: Colors.outline,
  },
});

export default nomadRequestTile;
