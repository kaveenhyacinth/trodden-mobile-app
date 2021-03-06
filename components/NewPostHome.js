import React from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import BodyText from "./BodyText";
import Typography from "../theme/Typography";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const NewPostHome = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.topColLft}>
          <FontAwesome5 name="edit" size={25} color={Colors.primary} />
        </View>
        <View style={styles.topColRgt}>
          <Pressable onPress={props.onPress}>
            <BodyText style={styles.postText}>
              Share a trodden moment...
            </BodyText>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.bottomCol}>
          <BodyText>
            <FontAwesome5 name="images" size={20} color={Colors.primary} />{" "}
            Photo
          </BodyText>
        </View>
        <View style={styles.bottomCol}>
          <BodyText>
            <FontAwesome5 name="camera" size={20} color={Colors.primary} />{" "}
            Camera
          </BodyText>
        </View>
        <View style={styles.bottomCol}>
          <BodyText>
            <FontAwesome5 name="video" size={20} color={Colors.primary} /> Video
          </BodyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 100,
    backgroundColor: Colors.accent,
  },
  topRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline,
  },
  topColLft: {
    flex: 1,
    alignItems: "center",
  },
  topColRgt: {
    flex: 5,
  },
  postText: {
    ...Typography.bodyTextBold,
    paddingVertical: 10,
  },
  bottomRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomCol: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    backgroundColor: Colors.outline,
    borderRadius: 20,
    marginHorizontal: 10,
  },
});

export default NewPostHome;
