import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../ui/BodyText";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const CreateNewTripHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Ionicons
            onPress={props.onPress}
            name="create-outline"
            size={25}
            color={Colors.primary}
          />
        </View>
        <View style={styles.colMid}>
          <BodyText style={styles.postText} onPress={props.onPress}>
            Plan a trip with Trodden...
          </BodyText>
        </View>
        <View style={styles.colRight}>
          <Ionicons
            onPress={props.onPress}
            name="chevron-forward-outline"
            size={20}
            color={Colors.primary}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: 50,
    backgroundColor: Colors.accent,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline,
  },
  colLeft: {
    flex: 1,
    alignItems: "center",
  },
  colMid: {
    flex: 5,
  },
  colRight: {
    flex: 1,
    alignItems: "center",
  },
  postText: {
    ...Typography.bodyText,
    paddingVertical: 10,
  },
});

export default CreateNewTripHeader;
