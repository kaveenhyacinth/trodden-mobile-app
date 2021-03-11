import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../../theme/Colors";
import BodyText from "../../components/BodyText";

const EmptyScreen = (props) => {
  return (
    // <ScreenView style={styles.container}>
    <View style={styles.container}>
      <Image source={require("../../assets/empty.png")} style={styles.image} />
      <BodyText style={styles.msg}>Nothing to show right now!</BodyText>
    </View>
    // </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").width,
    width: Dimensions.get("screen").width,
    minWidth: 300,
    maxWidth: "90%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  msg: {
    color: Colors.info,
  },
});

export default EmptyScreen;
