import React, { useState } from "react";
import { View, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "./BodyText";
import ImageGallary from "./ImageGallary";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const Memory = () => {
  const ContentText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing eleit. Mauris id diam consectetur, tincidunt lorem quis tempus urna. Nullam sagittis efficitur augue, vitae laoreet dui pharetra non. Morbi accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing eleit. Mauris id diam consectetur, tincidunt lorem quis tempus urna. Nullam sagittis efficitur augue, vitae laoreet dui pharetra non. Morbi accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing eleit. Mauris id diam consectetur, tincidunt lorem quis tempus urna. Nullam sagittis efficitur augue, vitae laoreet dui pharetra non. Morbi accumsan.";

  const images = [
    { link: "https://bit.ly/3rfCwbA", id: 3 },
    { link: "https://bit.ly/3e9xh9N", id: 1 },
    { link: "https://bit.ly/3qeC7EV", id: 2 },
  ];

  const [isReadMore, setIsReadMore] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked((prevState) => !prevState);
  };

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
          <Pressable
            onPress={() => setIsOpenSettings((prevState) => !prevState)}
          >
            <FontAwesome5 name="ellipsis-v" size={15} color={Colors.info} />
          </Pressable>
        </View>
      </View>
      {/* End Header */}

      {/* Start Content */}
      <View style={styles.content}>
        {isReadMore ? (
          <>
            <BodyText>{ContentText}</BodyText>
            <Pressable onPress={() => setIsReadMore(false)}>
              <BodyText style={styles.colExpLink}>Collapse...</BodyText>
            </Pressable>
          </>
        ) : (
          <>
            <BodyText>{ContentText.substr(0, 100)}</BodyText>
            <Pressable onPress={() => setIsReadMore(true)}>
              <BodyText style={styles.colExpLink}>Read More...</BodyText>
            </Pressable>
          </>
        )}
      </View>
      {/* End Content */}

      {/* Start Image Section */}
      {images.length > 1 ? (
        <ImageGallary images={images} />
      ) : (
        <View style={styles.imagesWrapper}>
          {images.map((item) => (
            <Image
              style={styles.image}
              key={item.id}
              source={{ uri: item.link }}
            />
          ))}
        </View>
      )}
      {/* End Image Section */}

      {/* Start Status Bar */}
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
