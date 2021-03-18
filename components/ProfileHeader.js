import React, { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "../components/BodyText";
import ScreenView from "../components/ScreenView";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const ProfileHeader = (props) => {
  const nomadStore = useSelector((state) => state.nomadStore);

  useEffect(() => {
    props.navigation.setOptions({ title: `@${nomadStore.username}` });
  });

  return (
    <ScreenView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: `${Constants.manifest.extra.BASE_URL}/image/${nomadStore.prof_img}`,
              }}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <BodyText style={styles.name} numberOfLines={2}>
            {`${nomadStore.first_name} ${nomadStore.last_name}`}
          </BodyText>
          <BodyText
            style={styles.username}
          >{`@${nomadStore.username}`}</BodyText>
          <BodyText style={styles.country}>
            <FontAwesome5 name="map-marker-alt" />{" "}
            {`${nomadStore.city}, ${nomadStore.country}`}
          </BodyText>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>{24}</BodyText>
            <BodyText style={styles.infoText}>Memos</BodyText>
          </View>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>{10}</BodyText>
            <BodyText style={styles.infoText}>Trips</BodyText>
          </View>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>{112}</BodyText>
            <BodyText style={styles.infoText}>Dots</BodyText>
          </View>
        </View>
        <View style={styles.bio}>
          <BodyText style={styles.bioText}>{nomadStore.prof_bio}</BodyText>
        </View>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  topSection: {
    height: SCREEN_HEIGHT * 0.2,
    flexDirection: "row",
  },
  bottomSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftSection: {
    width: SCREEN_WIDTH * 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SCREEN_WIDTH * 0.05,
  },
  rightSection: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  imageWrapper: {
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_WIDTH * 0.28,
    borderWidth: 4,
    borderColor: Colors.primary,
    borderRadius: SCREEN_WIDTH * 0.15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.background,
    paddingVertical: 10,
  },
  info: {
    marginRight: SCREEN_WIDTH * 0.05,
    marginBottom: 10,
  },
  infoText: {
    ...Typography.bodyTextBold,
    color: Colors.info,
    textAlign: "center",
    fontSize: 18,
  },
  name: {
    ...Typography.bodyTextBold,
    fontSize: 20,
  },
  username: {
    color: Colors.primary,
    fontSize: 16,
  },
  country: {
    color: Colors.info,
  },
  bio: {
    width: SCREEN_WIDTH,
    paddingVertical: 15,
    paddingHorizontal: SCREEN_WIDTH * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  bioText: {
    color: Colors.info,
    textAlign: "center",
  },
});

export default ProfileHeader;
