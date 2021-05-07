import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { downloadImage } from "../../helpers/mediaHandler";
import Colors from "../../theme/Colors";
import BigButton from "../ui/BigButton";
import BodyText from "../ui/BodyText";
import TitleText from "../ui/TitleText";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const BlazeModal = ({ data, onNavigate }) => {
  console.log("Blaze", data);
  return (
    <Pressable onPress={() => onNavigate()}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{ uri: downloadImage(data.image) }}
          />
        </View>
        <View style={styles.infoWrapper}>
          <BodyText style={styles.date}>
            {new Date(data.date).toDateString()}
          </BodyText>
          <TitleText style={styles.title}>{data.title}</TitleText>
          <BodyText style={styles.location}>{data.location.des_name}</BodyText>
          <BodyText style={styles.going}>{`${data.participants.length} going`}</BodyText>
        </View>
      </View>
    </Pressable>
  );
};

export default BlazeModal;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 30,
    // height: WINDOW_WIDTH - 60,
    marginVertical: 10,
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: 10,
  },
  imageWrapper: {
    width: WINDOW_WIDTH - 30,
    height: ((WINDOW_WIDTH - 30) / 16) * 9,
    borderRadius: 10,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    overflow: "hidden",
  },
  image: { flex: 1, resizeMode: "cover" },
  infoWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    marginVertical: 0,
    fontSize: 20,
  },
  date: {
    color: Colors.red,
    fontSize: 14,
    textTransform: "uppercase",
  },
  location: {
    fontWeight: "bold",
    color: Colors.info,
    fontSize: 14
  },
  going: {
    color: Colors.info,
    fontSize: 13
  }
});
