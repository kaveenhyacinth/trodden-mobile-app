import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CreateNewTripHeader from "../../components/headers/CreateNewTripHeader";
import FloatingButton from "../../components/ui/FloatingButton";

const TripsScreenUser = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingTop: 50, alignItems: "center" }}></View>
  );
};

export default TripsScreenUser;

const styles = StyleSheet.create({});
