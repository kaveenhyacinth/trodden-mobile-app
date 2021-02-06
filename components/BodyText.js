import React from "react";
import { Text, StyleSheet } from "react-native";

import Typography from "../theme/Typography";

const BodyText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Typography.bodyText,
  },
});

export default BodyText;
