import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { downloadImage } from "../../helpers/mediaHandler";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../ui/BodyText";
import { useSelector } from "react-redux";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const ProfileHeader = (props) => {
  const nomadStore = useSelector((state) => state.nomadStore);

  const renderInterests = () => {
    return props.nomad.interests.map((interest, index) => {
      console.log("Interest", interest);
      const isCommon = nomadStore.data.interests.findIndex(
        (item) => item._id === interest._id
      );
      return (
        <BodyText
          key={index.toString()}
          style={{
            marginHorizontal: 2,
            marginVertical: 2,
            backgroundColor:
              isCommon !== -1 ? Colors.primary : Colors.background,
            borderRadius: 10,
            borderWidth: isCommon !== -1 ? 0 : 1,
            borderColor: Colors.primary,
            color: isCommon !== -1 ? Colors.accent : Colors.primary,
            paddingVertical: 2,
            paddingHorizontal: 8,
          }}
        >
          {interest.title}
        </BodyText>
      );
    });
  };

  return (
    <View>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: downloadImage(props.nomad.prof_img),
              }}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <BodyText style={styles.name} numberOfLines={2}>
            {`${props.nomad.first_name} ${props.nomad.last_name}`}
          </BodyText>
          <BodyText
            style={styles.username}
          >{`@${props.nomad.username}`}</BodyText>
          <BodyText style={styles.country}>
            <Ionicons name="location" />{" "}
            {`${props.nomad.city}, ${props.nomad.country}`}
          </BodyText>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>
              {props.nomad.memories.length < 10
                ? `0${props.nomad.memories.length}`
                : props.nomad.memories.length}
            </BodyText>
            <BodyText style={styles.infoText}>
              {props.nomad.memories.length === 1 ? "Memo" : "Memos"}
            </BodyText>
          </View>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>
              {props.nomad.trips.length < 10
                ? `0${props.nomad.trips.length}`
                : props.nomad.trips.length}
            </BodyText>
            <BodyText style={styles.infoText}>
              {props.nomad.trips.length === 1 ? "Trip" : "Trips"}
            </BodyText>
          </View>
          <View style={styles.info}>
            <BodyText style={styles.infoText}>
              {props.nomad.tribe.length < 10
                ? `0${props.nomad.tribe.length}`
                : props.nomad.tribe.length}
            </BodyText>
            <BodyText style={styles.infoText}>
              {props.nomad.tribe.length === 1 ? "Bond" : "Bonds"}
            </BodyText>
          </View>
        </View>
        <View style={styles.bio}>
          <BodyText style={styles.bioText}>{props.nomad.prof_bio}</BodyText>
        </View>
        <View style={styles.interests}>{renderInterests()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
  topSection: {
    height: WINDOW_HEIGHT * 0.2,
    flexDirection: "row",
  },
  bottomSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftSection: {
    width: WINDOW_WIDTH * 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: WINDOW_WIDTH * 0.05,
  },
  rightSection: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  imageWrapper: {
    width: WINDOW_WIDTH * 0.28,
    height: WINDOW_WIDTH * 0.28,
    borderWidth: 4,
    borderColor: Colors.primary,
    borderRadius: WINDOW_WIDTH * 0.15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    width: WINDOW_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: Colors.background,
    paddingVertical: 10,
  },
  info: {
    marginRight: WINDOW_WIDTH * 0.05,
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
    width: WINDOW_WIDTH,
    paddingVertical: 15,
    paddingHorizontal: WINDOW_WIDTH * 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  bioText: {
    color: Colors.info,
    textAlign: "center",
  },
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default ProfileHeader;
