import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BigButton from "../components/BigButton";
import BigButtonLight from "../components/BigButtonLight";

const OpenScreen = (props) => {
  return (
    <ScreenView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Trodden</Text>
        <Text style={styles.quote}>Always take the scenic road</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/openScreenImage.png")}
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
            props.navigation.navigate("postAuth", {
              screen: "signupInfoTwo",
            });
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
    ...Typography.displayHeavy,
    color: Colors.primary,
    textAlign: "center",
  },
  quote: {
    ...Typography.bodyTextBold,
    color: "#999",
    fontSize: 14
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
