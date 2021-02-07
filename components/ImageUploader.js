import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "./ScreenView";
import BodyText from "./BodyText";

const ImgPicker = (props) => {
  const [image, setImage] = useState(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera roll permission to proceed",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const selectImageHandler = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{...styles.imagePicker, ...props.style}}>
      <View style={styles.imagePrev}>
        {image !== null ? (
          <Image style={styles.image} source={{uri: image}}/>
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
          onPress={selectImageHandler}
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
    marginBottom: 20
  },
});

export default ImgPicker;
