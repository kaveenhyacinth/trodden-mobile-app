import React, { useState } from "react";
import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";
import Constants from "expo-constants";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "./BodyText";
import ImageGallary from "./ImageGallary";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const imageUrl = (uri) => `${Constants.manifest.extra.BASE_URL}/image/${uri}`;
const videoUrl = (uri) => `${Constants.manifest.extra.BASE_URL}/video/${uri}`;

const Memory = ({ data }) => {
  const ContentText = data.content;
  const media = data.media;
  const user = data.owner;
  const destination = data.destination;

  const [isReadMore, setIsReadMore] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked((prevState) => !prevState);
  };

  const renderContent = () => {
    if (ContentText.length < 100) {
      return <BodyText>{ContentText}</BodyText>;
    }

    if (!isReadMore) {
      return (
        <>
          <BodyText>{ContentText.substr(0, 100)}</BodyText>
          <Pressable onPress={() => setIsReadMore(true)}>
            <BodyText style={styles.colExpLink}>Read More...</BodyText>
          </Pressable>
        </>
      );
    }

    return (
      <>
        <BodyText>{ContentText}</BodyText>
        <Pressable onPress={() => setIsReadMore(false)}>
          <BodyText style={styles.colExpLink}>Collapse...</BodyText>
        </Pressable>
      </>
    );
  };

  const renderGalary = (media) => {
    const type = media[0].type;
    if (type.includes("image")) {
      if (media.length > 1) return <ImageGallary media={media} />;
      return (
        <View style={styles.imagesWrapper}>
          {media.map((item) => (
            <Image
              style={styles.image}
              key={item._id}
              source={{
                uri: imageUrl(item.uri),
              }}
            />
          ))}
        </View>
      );
    }

    if (type.includes("video")) {
      return (
        <View style={styles.videoWrapper}>
          {media.map((item) => (
            <Video
              key={item._id}
              style={styles.image}
              source={{
                uri: videoUrl(item.uri),
              }}
              useNativeControls
              resizeMode="cover"
              isLooping={true}
            />
          ))}
        </View>
      );
    }
  };

  return (
    <View style={styles.container} removeClippedSubviews>
      {/* Start Header */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Pressable onPress={() => {}}>
            <View style={styles.headerImageWrapper}>
              <Image
                style={styles.headerImage}
                source={{ uri: imageUrl(user.prof_img) }}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.midSection}>
          <BodyText
            style={styles.headerName}
          >{`${user.first_name} ${user.last_name}`}</BodyText>
          <Pressable onPress={() => {}}>
            <BodyText style={styles.headerLocation}>
              <FontAwesome5 name="map-marker-alt" color={Colors.primary} />
              {destination ? " " + destination.des_name : " Somewhere on Earth"}
            </BodyText>
          </Pressable>
        </View>
        <View style={styles.rightSection}>
          <Pressable
            onPress={() => setIsOpenSettings((prevState) => !prevState)}
          >
            <FontAwesome5 name="ellipsis-v" size={15} color={Colors.info} />
          </Pressable>
        </View>
      </View>
      <View style={styles.content}>{renderContent()}</View>
      {renderGalary(media)}
      <View style={styles.statusBar}>
        <View style={styles.statusIconContainer}>
          <Pressable onPress={handleLike}>
            {isLiked ? (
              <Ionicons
                style={styles.statusIcon}
                size={30}
                color={Colors.primary}
                name="bonfire"
              />
            ) : (
              <Ionicons
                style={styles.statusIcon}
                size={30}
                color={Colors.outline}
                name="bonfire-outline"
              />
            )}
          </Pressable>
          <Ionicons
            style={styles.statusIcon}
            size={25}
            color={Colors.outline}
            name="chatbubble-outline"
          />
          {/* <Pressable onPress={() => setIsSaved((prevState) => !prevState)}>
          {isSaved ? (
            <Ionicons
              style={styles.statusIcon}
              size={25}
              color={Colors.primary}
              name="bookmark"
            />
          ) : (
            <Ionicons
              style={styles.statusIcon}
              size={25}
              color={Colors.outline}
              name="bookmark-outline"
            />
          )}
        </Pressable> */}
        </View>
        <View style={styles.statusTextContainer}>
          <BodyText style={styles.statusText}>
            {isLiked ? "52" : "51"} Twigs
          </BodyText>
        </View>
      </View>
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  colExpLink: {
    ...Typography.bodyTextBold,
    color: Colors.primary,
    fontSize: 14,
  },
  imagesWrapper: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  videoWrapper: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  image: {
    flex: 1,
  },
  statusBar: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statusIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: 10,
  },
  statusText: {
    color: Colors.outline,
  },
});

export default Memory;
