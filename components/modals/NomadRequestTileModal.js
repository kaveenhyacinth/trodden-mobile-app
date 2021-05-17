import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import { downloadImage } from "../../helpers/mediaHandler";
import { Fetch } from "../../helpers/deviceStorageHandler";
import api from "../../api/index";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../ui/BodyText";
import BigButton from "../ui/BigButton";
import ErrorAlertModal from "../modals/ErrorAlertModal";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const TILE_HEIGHT = 90;

const NomadRequestTileModal = (props) => {
  const [owner, setOwner] = useState(props.data.owner ?? props.data);

  useEffect(() => {
    setOwner(props.data.owner ?? props.data);
  }, [props.data]);

  const renderButtons = (type = "regular") => {
    if (type === "suggestion")
      return (
        <View style={styles.lowerDiv}>
          <BigButton style={styles.button} onPress={handleBondRequest}>
            Add
          </BigButton>
          <BigButton
            onPress={handleViewProfile}
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
    if (type === "own")
      return (
        <View style={styles.lowerDiv}>
          <BigButton style={styles.button} onPress={handleViewProfile}>
            View Your Profile
          </BigButton>
        </View>
      );
    return (
      <View style={styles.lowerDiv}>
        <BigButton style={styles.button} onPress={handleViewProfile}>
          View
        </BigButton>
        <BigButton
          style={{ ...styles.button, ...styles.lite }}
          textStyle={{ color: Colors.info }}
          onPress={handleBondRemovePrompt}
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
      const response = await api.put.requestBond(reqBody);
      if (!response.data.success)
        throw new Error("Couldn't place bond request");
      props.onRefresh();
    } catch (error) {
      ErrorAlertModal(error.message, error);
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
      const response = await api.patch.acceptBond(reqBody);
      if (!response.data.success)
        throw new Error("Couldn't place bond request");
      props.onRefresh();
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  const handleBondReject = async () => {
    try {
      const requestId = props.requestId;
      const response = await api.delete.rejectBond(requestId);
      if (!response.data.success) throw new Error(response.data.msg);
      props.onRefresh();
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  const handleBondRemovePrompt = () => {
    Alert.alert(
      "Do you want to Remove the Bond?",
      `${owner.first_name} is going to miss you!`,
      [
        {
          text: "Yes",
          style: "default",
          onPress: () => handleBondBreak(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleBondBreak = async () => {
    try {
      const userId = await Fetch("nomadId");
      const response = await api.delete.removeBond({
        user: userId,
        bond: owner._id,
      });
      if (!response.data.success) throw new Error(response.data.msg);
      props.onRefresh();
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  };

  const handleViewProfile = () => {
    props.onNavigate();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.imageWrapper}>
          <Pressable onPress={handleViewProfile}>
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
            onPress={handleViewProfile}
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
    width: WINDOW_WIDTH,
    height: TILE_HEIGHT,
    marginVertical: 10,
    backgroundColor: Colors.accent,
  },
  leftSection: {
    height: TILE_HEIGHT,
    width: TILE_HEIGHT + 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imageWrapper: {
    width: TILE_HEIGHT,
    height: TILE_HEIGHT,
    borderRadius: TILE_HEIGHT / 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rightSection: {
    height: "100%",
    width: WINDOW_WIDTH - 110,
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

export default NomadRequestTileModal;
