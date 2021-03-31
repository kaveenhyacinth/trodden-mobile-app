import React from "react";
import { Text, StyleSheet } from "react-native";

import Typography from "../../theme/Typography";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Typography.title,
  },
});

export default TitleText;
