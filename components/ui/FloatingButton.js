import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/Colors";

const FloatingButton = ({ style, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
        styles.container,
        style,
      ]}
    >
      <Ionicons name="add" size={23} color={Colors.white} />
    </Pressable>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 20,
    right: 30,
    elevation: 5,
  },
});
