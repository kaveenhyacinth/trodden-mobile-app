import React, { useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { downloadImage } from "../../helpers/mediaHandler";
import Colors from "../../theme/Colors";
import BodyText from "./BodyText";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const ImageGallary = (props) => {
  const [media] = useState(props.media);

  let count = 0;

  return (
    <View style={styles.imagesWrapper}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        horizontal
        pagingEnabled
      >
        {media.map((item) => (
          <ImageBackground
            key={item._id}
            style={styles.image}
            source={{
              uri: downloadImage(item.uri),
            }}
          >
            <View style={styles.counterWrapper}>
              <BodyText style={styles.counter}>
                {++count}/{media.length}
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
    height: WINDOW_WIDTH,
    width: WINDOW_WIDTH,
  },
  scroll: {
    flexGrow: 1,
    overflow: "hidden",
  },
  image: {
    height: WINDOW_WIDTH,
    width: WINDOW_WIDTH,
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
