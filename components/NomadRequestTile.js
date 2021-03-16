import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { downloadImage } from "../services/mediaService";
import Colors from "../theme/Colors";
import BodyText from "./BodyText";
import Typography from "../theme/Typography";
import BigButton from "../components/BigButton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const tileHeight = 90;

const nomadRequestTile = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: downloadImage(props.data.prof_img) }}
          />
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.upperDiv}>
          <BodyText
            style={styles.upperDivText}
          >{`${props.data.first_name} ${props.data.last_name}`}</BodyText>
        </View>
        <View style={styles.lowerDiv}>
          <BigButton style={styles.button}>Add</BigButton>
          <BigButton style={{ ...styles.button, ...styles.lite }} textStyle={{color: Colors.text}}>
            View
          </BigButton>
        </View>
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
