import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../theme/Colors";

const InterestGridTile = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectionHandler = () => {
    props.onSelect();
    setIsSelected((selection) => !selection);
  };

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, styles.gridItem]}
      onPress={selectionHandler}
    >
      {isSelected === true ? (
        <View style={{ ...styles.selectedContainer, ...props.style }}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      ) : (
        <View style={{ ...styles.container, ...props.style }}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    // elevation: 5,
    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 3,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedContainer: {
    flex: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 5,
    // elevation: 5,
    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 3,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default InterestGridTile;
