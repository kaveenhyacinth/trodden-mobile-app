import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../theme/Colors";
import BodyText from "./BodyText";

const FlatlistFooter = () => {
  return (
    <View style={styles.footer}>
      <BodyText style={styles.footerText}>{"- End of the list -"}</BodyText>
    </View>
  );
};

export default FlatlistFooter;

const styles = StyleSheet.create({
  footer: {
    padding: 2,
    paddingBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: Colors.outline,
    fontSize: 12,
  },
});
