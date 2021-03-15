import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import Colors from "../theme/Colors";
import BodyText from "./BodyText";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const imageUrl = (uri) => `${Constants.manifest.extra.BASE_URL}/image/${uri}`;

const ImageGallary = (props) => {
  let count = 0;
  return (
    <View style={styles.imagesWrapper}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        horizontal
        pagingEnabled
      >
        {props.media.map((item) => (
          <ImageBackground
            key={item._id}
            style={styles.image}
            source={{
              uri: imageUrl(item.uri),
            }}
          >
            <View style={styles.counterWrapper}>
              <BodyText style={styles.counter}>
                {++count}/{props.media.length}
              </BodyText>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imagesWrapper: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  scroll: {
    flexGrow: 1,
    overflow: "hidden",
  },
  image: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    resizeMode: "cover",
    alignItems: "flex-end",
  },
  counterWrapper: {
    backgroundColor: Colors.text,
    width: 50,
    height: 30,
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  counter: {
    color: Colors.accent,
  },
});

export default ImageGallary;
