import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../theme/Colors";

const customHeaderButton = (props) => {
  return <HeaderButton {...props} iconSize={23} />;
};

export default customHeaderButton;
