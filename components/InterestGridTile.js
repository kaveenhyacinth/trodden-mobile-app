import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";

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
          <ImageBackground
            style={styles.bgimg}
            source={props.imageUrl}
          >
            <Text style={styles.selectedTitle} numberOfLines={1}>
              {props.title}
            </Text>
          </ImageBackground>
        </View>
      ) : (
        <View style={{ ...styles.container, ...props.style }}>
          <ImageBackground
            style={styles.bgimg}
            source={props.imageUrl}
          >
            <Text style={styles.title} numberOfLines={1}>
              {props.title}
            </Text>
          </ImageBackground>
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
    height: "100%",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    overflow: "hidden",
  },
  selectedContainer: {
    flex: 1,
    height: "100%",
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    overflow: "hidden",
  },
  bgimg: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    padding: 10,
    backgroundColor: "rgba(62, 148, 63, 0.8)",
    color: "white",
  },
  selectedTitle: {
    flex: 1,
    fontSize: 24,
    textAlign: "center",
    padding: 10,
    backgroundColor: "rgba(62, 148, 63, 0.95)",
    color: "white",
  },
});

export default InterestGridTile;
