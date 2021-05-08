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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Pressable onPress={() => {}}>
            <View style={styles.headerImageWrapper}>
              <Image
                style={styles.headerImage}
                source={{ uri: downloadImage(data.owner.prof_img) }}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.midSection}>
          <BodyText
            style={styles.headerName}
          >{`${data.owner.first_name} ${data.owner.last_name}`}</BodyText>
          <Pressable onPress={() => {}}>
            <BodyText style={styles.headerLocation}>
              <Ionicons name="location" color={Colors.primary} />
              {data.destination
                ? " " + data.destination.des_name
                : " Somewhere on Earth"}
            </BodyText>
          </Pressable>
        </View>
        <View style={styles.rightSection}>
          <Pressable
            onPress={() => setIsOpenSettings((prevState) => !prevState)}
          >
            <Ionicons name="ellipsis-vertical" size={15} color={Colors.info} />
          </Pressable>
        </View>
      </View>
      <View>
        <BodyText>{data.title}</BodyText>
        <BodyText>{`${new Date(data.start_date).toDateString()} to ${new Date(
          data.end_date
        ).toDateString()} (${
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
      </View>
      <View>
        <BodyText>{data.desc}</BodyText>
      </View>
      <MapView style={styles.map} region={MAP_REGION}>
        <Marker
          title="Selected Location"
          coordinate={{
            latitude: 8.743221102619863,
            longitude: 80.93281924724579,
          }}
        ></Marker>
      </MapView>
    </View>
  );
};

export default TripModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    width: WINDOW_WIDTH,
    marginVertical: 5,
    //#region IOS Elevation
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.12,
    // shadowRadius: 60,
    //#endregion
    // elevation: 2,
  },
  header: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  leftSection: {
    height: 50,
    width: WINDOW_WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImageWrapper: {
    height: "100%",
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: "hidden",
  },
  headerImage: {
    width: 50,
    height: "100%",
  },
  midSection: {
    width: WINDOW_WIDTH * 0.7,
  },
  headerName: {
    ...Typography.bodyTextBold,
    fontSize: 18,
  },
  headerLocation: {
    fontSize: 14,
    color: Colors.info,
  },
  rightSection: {
    width: WINDOW_WIDTH * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
  },
});
