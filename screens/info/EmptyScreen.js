import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../../theme/Colors";
import BodyText from "../../components/ui/BodyText";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const EmptyScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/empty.png")} style={styles.image} />
      <BodyText style={styles.msg}>Nothing to show right now!</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: WINDOW_WIDTH * 0.5,
    height: WINDOW_WIDTH * 0.5,
    resizeMode: "contain",
  },
  msg: {
    color: Colors.info,
  },
});

export default EmptyScreen;
