import React from "react";
import { Text, View, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/Colors";

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
      <Text>
        <Ionicons name="chevron-down" />
      </Text>
    </View>
  </View>
</Modal>;
