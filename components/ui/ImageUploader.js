import React from "react";
import { View, StyleSheet, Image, Button } from "react-native";
import Colors from "../../theme/Colors";
import BodyText from "./BodyText";

const ImgPicker = (props) => {
  return (
    <View style={{ ...styles.imagePicker, ...props.style }}>
      <View style={styles.imagePrev}>
        {props.image !== null ? (
          <Image style={styles.image} source={{ uri: props.image }} />
        ) : (
          <Image
            style={styles.image}
            source={require("../assets/adaptive-icon.png")}
          />
        )}
      </View>
      <View style={styles.textArea}>
        <BodyText style={styles.text}>Upload new profile image</BodyText>
        <Button
          title="Upload"
          color={Colors.primary}
          onPress={props.onUpload}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imagePrev: {
    width: 150,
    height: 150,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 75,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textArea: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    marginBottom: 20,
  },
});

export default ImgPicker;
