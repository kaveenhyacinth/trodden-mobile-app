import React from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../../theme/Colors";
import ScreenView from "../../components/ScreenView";
import BodyText from "../../components/BodyText";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const NewPostScreen = () => {
  return (
    <ScreenView style={styles.screen}>
      {/* Start Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <View style={styles.headerImageWrapper}>
              <Image
                style={styles.headerImage}
                source={{ uri: "https://bit.ly/3rbZYXf" }}
              />
            </View>
          </View>
          <View style={styles.midSection}>
            <BodyText style={styles.headerName}>Kaveen Hyacinth</BodyText>
          </View>
        </View>
      </View>
      {/* End Header */}

      <View style={styles.inputAreaContainer}>
        <Text>Input Area</Text>
      </View>
      <View style={styles.selectedItemsAreaContainer}>
        <Text>Selected Items area</Text>
      </View>
      <View style={styles.statusAreaContainer}>
        <Text>Status Area</Text>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: "#ccc",
  },
  inputAreaContainer: {
    flex: 6,
    width: SCREEN_WIDTH,
    backgroundColor: "#fcc",
  },
  selectedItemsAreaContainer: {
    flex: 2,
    width: SCREEN_WIDTH,
    backgroundColor: "#cfc",
  },
  statusAreaContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: "#ccf",
  },
});

export default NewPostScreen;
