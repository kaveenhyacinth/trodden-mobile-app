import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import ScreenView from "../components/ScreenView";
import BigButton from "../components/BigButton";

const TestScreen = (props) => {
  return (
    <ScreenView>
      
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>Hello</Text>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  text: {
    lineHeight: 20,
  },
});

export default TestScreen;
