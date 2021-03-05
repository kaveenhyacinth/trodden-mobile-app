import React from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "./BodyText";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const Memory = () => {
  return (
    <View style={styles.container} removeClippedSubviews>
      {/* Start Header */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.headerImageWrapper}>
            <Image
              style={styles.headerImage}
              source={{ uri: "https://bit.ly/3rbZYXf" }}
            />
          </View>
        </View>
        <View style={styles.midSection}>
          <BodyText style={styles.headerName}>Kaveen Hyacinth</BodyText>
          <BodyText style={styles.headerLocation}>
            <FontAwesome5 name="map-marker-alt" color={Colors.primary} />{" "}
            Meemure, Sri Lanka
          </BodyText>
        </View>
        <View style={styles.rightSection}>
          <Pressable>
            <FontAwesome5 name="ellipsis-v" size={15} color={Colors.info} />
          </Pressable>
        </View>
      </View>
      {/* End Header */}

      {/* Start Content */}
      <View style={styles.content}>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id
          diam consectetur, tincidunt lorem quis, tempus urna. Nullam sagittis
          efficitur augue, vitae laoreet dui pharetra non. Morbi accumsan.
        </BodyText>
      </View>
      {/* End Content */}

      {/* Start Image Section */}
      <View style={styles.imagesWrapper}></View>
      {/* End Image Section */}

      {/* Start Status Bar */}
      <View style={styles.statusBar}></View>
      {/* End Status Bar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    width: SCREEN_WIDTH,
    marginVertical: 6,
    //#region IOS Elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    //#endregion
    elevation: 5,
  },
  header: {
    // backgroundColor: "#fcc",
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  leftSection: {
    height: 50,
    width: SCREEN_WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImageWrapper: {
    height: "100%",
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  headerImage: {
    width: 50,
    height: "100%",
  },
  midSection: {
    width: SCREEN_WIDTH * 0.7,
  },
  headerName: {
    ...Typography.bodyTextBold,
    fontSize: 18,
  },
  headerLocation: {
    fontSize: 14,
    color: Colors.info,
  },
  rightSection: {
    width: SCREEN_WIDTH * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#ffc",
    height: 80,
  },
  imagesWrapper: {
    backgroundColor: "#cfc",
    height: SCREEN_WIDTH,
  },
  statusBar: {
    backgroundColor: "#ccf",
    height: 60,
  },
});

export default Memory;
