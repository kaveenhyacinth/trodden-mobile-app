import React from "react";
import { View, ImageBackground, StyleSheet, Pressable } from "react-native";
import Colors from "../theme/Colors";
import { Ionicons } from "@expo/vector-icons";

const MemoImagePreview = (props) => {
  return (
    <ImageBackground
      style={{ ...styles.selectedImage, ...props.style }}
      source={{ uri: props.source }}
    >
      <Pressable onPress={props.onClose}>
        <View style={styles.counterWrapper}>
          <Ionicons name="close-circle" size={20} color={Colors.accent} />
        </View>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  selectedImage: {
    height: 100,
    width: 100,
    resizeMode: "cover",
    alignItems: "flex-end",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 5,
  },
  counterWrapper: {
    backgroundColor: Colors.info,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});

export default MemoImagePreview;
