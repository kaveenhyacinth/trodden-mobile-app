import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "./BodyText";

<Modal
transparent
animationType="slide"
visible={isOpenSettings}
onRequestClose={() => setIsOpenSettings((prevState) => !prevState)}
>
<View
  style={{
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  }}
>
  <View
    style={{
      height: SCREEN_HEIGHT * 0.4,
      width: SCREEN_WIDTH,
      backgroundColor: Colors.accent,
      elevation: 10,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
    }}
  >
    <Text><FontAwesome5 name="chevron-down" /></Text>
  </View>
</View>
</Modal>