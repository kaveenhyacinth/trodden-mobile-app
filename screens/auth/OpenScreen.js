import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import ScreenView from "../../components/ui/ScreenView";
import BigButton from "../../components/ui/BigButton";
import BigButtonLight from "../../components/ui/BigButtonLight";

const OpenScreen = (props) => {
  return (
    <ScreenView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trodden</Text>
        <Text style={styles.quote}>Always take the scenic road</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/openScreenImage.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BigButton
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("signUp");
          }}
        >
          Sign up
        </BigButton>
        <BigButtonLight
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("signIn");
          }}
        >
          Sign in
        </BigButtonLight>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  titleContainer: {
    height: Dimensions.get("window").height * 0.3,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...Typography.trodden,
    color: Colors.primary,
    textAlign: "center",
    fontSize: 48
  },
  quote: {
    ...Typography.bodyTextBold,
    color: "#999",
    fontSize: 14,
  },
  imageContainer: {
    height: Dimensions.get("window").height * 0.4,
    width: Dimensions.get("window").width * 0.8,
    minWidth: 300,
    maxWidth: "90%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.2,
    minWidth: 300,
    maxWidth: "90%",
    marginBottom: 20,
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
  button: {
    height: 50,
    marginVertical: 5,
  },
});

export default OpenScreen;
