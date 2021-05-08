import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { downloadImage } from "../../helpers/mediaHandler";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../ui/BodyText";
import MapView, { Marker } from "react-native-maps";

const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get("window");
const MAP_REGION = {
  latitude: 7.8774222,
  longitude: 80.7003428,
  latitudeDelta: 4,
  longitudeDelta: 1,
};

const TripModal = ({ data, navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate("Trip", { trip: data })}>
      <View style={styles.container}>
        <View>
          <BodyText style={styles.date}>{`${
            new Date(data.start_date).toDateString() ===
            new Date(data.end_date).toDateString()
              ? new Date(data.start_date).toDateString()
              : new Date(data.start_date).toDateString() +
                " ~ " +
                new Date(data.end_date).toDateString()
          }`}</BodyText>

          <BodyText style={styles.info}>{`(${
            new Date(data.end_date).getDate() -
            new Date(data.start_date).getDate() +
            1
          } ${
            new Date(data.end_date).getDate() -
              new Date(data.start_date).getDate() +
              1 ===
            1
              ? "day"
              : "days"
          } trip)`}</BodyText>
          <BodyText style={styles.title}>{data.title}</BodyText>
        </View>
        <View>
          <BodyText>{data.desc}</BodyText>
        </View>
      </View>
    </Pressable>
  );
};

export default TripModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    width: WINDOW_WIDTH - 30,
    marginVertical: 5,
    borderRadius: 10,
    padding: 20,
    // #region IOS Elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    // #endregion
    elevation: 2,
  },
  title: {
    ...Typography.title,
  },
  info: {
    color: Colors.info,
    fontSize: 14,
  },
  date: {
    color: Colors.red,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
