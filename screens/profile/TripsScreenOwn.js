import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CreateNewTripHeader from "../../components/headers/CreateNewTripHeader";
import FloatingButton from "../../components/ui/FloatingButton";

const TripsScreenOwn = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, paddingTop: 50, alignItems: "center" }}>
      {/* <CreateNewTripHeader
        onPress={() => {
          navigation.navigate("NewTrip");
        }}
      /> */}
      <FloatingButton
        onPress={() => {
          navigation.navigate("NewTrip");
        }}
      />
    </View>
  );
};

export default TripsScreenOwn;

const styles = StyleSheet.create({});
