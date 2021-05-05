import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Colors from "../../theme/Colors";
import EmptyScreen from "../info/EmptyScreen";

const Caravan = (props) => {
  useEffect(() => {
    const { params } = props.route;
    props.navigation.setOptions({
      title: `${params.name ?? "Caravan"}`,
    });
  }, [props.route, props.navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <EmptyScreen />
    </SafeAreaView>
  );
};

export default Caravan;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
  },
});
