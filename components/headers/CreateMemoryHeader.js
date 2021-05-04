import React from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../ui/BodyText";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const CreateMemoryHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.topColLft}>
          <Pressable onPress={props.onPress}>
            <Ionicons name="create-outline" size={25} color={Colors.primary} />
          </Pressable>
        </View>
        <View style={styles.topColRgt}>
          <Pressable onPress={props.onPress}>
            <BodyText style={styles.postText}>
              Share your memories with Trodden...
            </BodyText>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.bottomCol}>
          <BodyText onPress={props.onPress}>
            <Ionicons name="image" size={23} color={Colors.purple} />
          </BodyText>
        </View>
        <View style={styles.bottomCol}>
          <BodyText onPress={props.onPress}>
            <Ionicons name="camera" size={23} color={Colors.blue} />
          </BodyText>
        </View>
        <View style={styles.bottomCol}>
          <BodyText onPress={props.onPress}>
            <Ionicons name="videocam" size={23} color={Colors.red} />
          </BodyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
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
    ...Typography.bodyText,
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
    backgroundColor: Colors.background,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});

export default CreateMemoryHeader;
