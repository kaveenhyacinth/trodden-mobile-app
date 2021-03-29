import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const TripDayPlannerScreen = (props) => {
  useEffect(() => {
    props.route.params.title
      ? props.navigation.setOptions({
          title: `Day ${props.route.params.day} of ${props.route.params.title}`,
        })
      : props.navigation.setOptions({
          title: `Day ${props.route.params.day}`,
        });
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Let's plan day {props.route.params.day} of the trip</Text>
    </View>
  );
};

export default TripDayPlannerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
