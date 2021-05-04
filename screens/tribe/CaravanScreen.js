import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FloatingButton from "../../components/ui/FloatingButton";
import ScreenView from "../../components/ui/ScreenView";
import EmptyScreen from "../info/EmptyScreen";

const CaravanScreen = (props) => {
  return (
    <ScreenView>
      <EmptyScreen />
      <FloatingButton onPress={() => props.navigation.navigate("NewCaravan")} />
    </ScreenView>
  );
};

export default CaravanScreen;

const styles = StyleSheet.create({});
