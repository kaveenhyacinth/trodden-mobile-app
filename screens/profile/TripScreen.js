import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BodyText from "../../components/ui/BodyText";
import ScreenView from "../../components/ui/ScreenView";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const MAP_REGION = {
  latitude: 7.8774222,
  longitude: 80.7003428,
  latitudeDelta: 4,
  longitudeDelta: 3,
};

const TripScreen = ({ navigation, route }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.trip.title,
    });
  });

  useEffect(() => {
    let locations = [];
    for (let item of route.params.trip.dayPlans) {
      for (let plan of item.selectedLocations) {
        locations.push({ marker: plan, day: item.day });
      }
    }
    setMarkers([...locations]);
  }, [route.params.trip]);

  return (
    <ScreenView>
      <MapView style={styles.map} region={MAP_REGION}>
        {markers.map((item, index) => (
          <Marker
            key={index.toString()}
            title={`Day ${item.day}`}
            coordinate={{
              latitude: item.marker.latitude,
              longitude: item.marker.longitude,
            }}
          ></Marker>
        ))}
      </MapView>
      <View style={styles.container}>
        <BodyText style={styles.date}>{`${
          new Date(route.params.trip.start_date).toDateString() ===
          new Date(route.params.trip.end_date).toDateString()
            ? new Date(route.params.trip.start_date).toDateString()
            : new Date(route.params.trip.start_date).toDateString() +
              " ~ " +
              new Date(route.params.trip.end_date).toDateString()
        }`}</BodyText>
        <BodyText style={styles.info}>{`(${
          new Date(route.params.trip.end_date).getDate() -
          new Date(route.params.trip.start_date).getDate() +
          1
        } ${
          new Date(route.params.trip.end_date).getDate() -
            new Date(route.params.trip.start_date).getDate() +
            1 ===
          1
            ? "day"
            : "days"
        } trip)`}</BodyText>
        <BodyText style={styles.title}>{route.params.trip.title}</BodyText>
      </View>
      <View style={styles.container}>
        <BodyText>{route.params.trip.desc}</BodyText>
      </View>
      <View style={styles.container}>
        {route.params.trip.dayPlans.map((item, index) => (
          <View key={index.toString()} style={styles.noteWrapper}>
            <BodyText style={styles.day}>{`Day ${item.day} Notes`}</BodyText>
            <BodyText>{item.note}</BodyText>
          </View>
        ))}
      </View>
    </ScreenView>
  );
};

export default TripScreen;

const styles = StyleSheet.create({
  map: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
  },
  container: {
    alignItems: "flex-start",
    width: WINDOW_WIDTH,
    padding: 20,
    paddingBottom: 5,
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
  day: {
    color: Colors.info,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  noteWrapper: {
    paddingBottom: 20,
  },
});
