import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import { downloadImage } from "../../helpers/mediaHandler";
import { Fetch } from "../../helpers/deviceStorageHandler";
import api from "../../api/index";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../ui/BodyText";
import BigButton from "../ui/BigButton";
import ErrorAlertModal from "./ErrorAlertModal";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const TILE_HEIGHT = 90;
const TILE_WIDTH = WINDOW_WIDTH - 20;

const CaravanListTileModal = ({ caravan, onRefresh, onNavigate }) => {
  const [owner, setowner] = useState(false);

  const checkOwner = useCallback(async () => {
    try {
      const userId = await Fetch("nomadId");
      if (userId.toString() === caravan.owner._id.toString()) {
        setowner(true);
      }
    } catch (error) {
      setowner(false);
    }
  }, [caravan]);

  // const handleBondRequest = async () => {
  //   try {
  //     const nomadId = await Fetch("nomadId");
  //     const reqBody = {
  //       userId: nomadId,
  //       requestee: owner._id,
  //     };
  //     const response = await api.post.requestBond(reqBody);
  //     if (!response.data.success)
  //       throw new Error("Couldn't place bond request");
  //     props.onRefresh();
  //   } catch (error) {
  //     ErrorAlertModal(error);
  //   }
  // };
  const StubBondRequest = () => {
    alert("Joined!");
  };

  // const handleBondAccept = async () => {
  //   try {
  //     const nomadId = await Fetch("nomadId");
  //     const reqBody = {
  //       userId: nomadId,
  //       requestorId: owner._id,
  //       requestId: props.data._id,
  //     };
  //     const response = await api.patch.acceptBond(reqBody);
  //     if (!response.data.success)
  //       throw new Error("Couldn't place bond request");
  //     props.onRefresh();
  //   } catch (error) {
  //     ErrorAlertModal(error);
  //   }
  // };

  // // TODO:
  // const handleBondReject = async () => {
  //   alert("Reject");
  // };

  // //TODO:
  // const handleBondBreak = async () => {
  //   alert("Break");
  // };

  const renderButtons = () => {
    return (
      <View style={styles.lowerDiv}>
        <BigButton style={styles.button} onPress={StubBondRequest}>
          Chat
        </BigButton>
        <BigButton
          onPress={() => onNavigate()}
          style={{ ...styles.button, ...styles.lite }}
          textStyle={{ color: Colors.info }}
        >
          Visit
        </BigButton>
      </View>
    );
  };

  useEffect(() => {
    checkOwner();
  }, [checkOwner]);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.imageWrapper}>
          <Pressable onPress={() => onNavigate()}>
            <Image
              style={styles.image}
              source={{ uri: downloadImage(caravan.display_img) }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.upperDiv}>
          <BodyText style={styles.upperDivText} onPress={() => onNavigate()}>
            {caravan.caravan_name}
          </BodyText>
        </View>
        {renderButtons()}
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
    marginRight: 10,
  },
  lite: {
    backgroundColor: Colors.outline,
    borderColor: Colors.outline,
  },
});

export default CaravanListTileModal;
