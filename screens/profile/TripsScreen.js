import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CreateNewTripHeader from "../../components/CreateNewTripHeader";

const TripsScreen = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingTop: 50, alignItems: "center" }}>
      <CreateNewTripHeader
        onPress={() => {
          navigation.navigate("NewTrip");
        }}
      />
    </View>
  );
};

export default TripsScreen;

const styles = StyleSheet.create({});
