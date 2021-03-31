import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ui/ScreenView";

const LoadingScreen = (props) => {
  return (
    <ScreenView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/loading.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    ...Typography.trodden,
    color: Colors.primary,
    textAlign: "center",
  },
  imageContainer: {
    flex: 8,
    width: Dimensions.get("window").width,
    minWidth: 300,
    maxWidth: "90%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  loadingContainer: {
    flex: 1,
  },
});

export default LoadingScreen;
