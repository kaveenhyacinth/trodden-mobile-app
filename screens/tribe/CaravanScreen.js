import React from "react";
import { StyleSheet } from "react-native";
import FloatingButton from "../../components/ui/FloatingButton";
import ScreenView from "../../components/ui/ScreenView";
import EmptyScreen from "../info/EmptyScreen";

const CaravanScreen = (props) => {
  const handleNavigation = () => {
    props.navigation.navigate("NewCaravan");
  };

  return (
    <ScreenView>
      <EmptyScreen />
      <FloatingButton onPress={handleNavigation} />
    </ScreenView>
  );
};

export default CaravanScreen;

const styles = StyleSheet.create({});
