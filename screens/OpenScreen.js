import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

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
        <Text style={styles.quote}>Sandy Toes, Sunkissed Nose</Text>
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
              screen: "selectInterests",
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
    height: Dimensions.get("window").height * 0.4,
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
  },
  buttonContainer: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.5,
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
