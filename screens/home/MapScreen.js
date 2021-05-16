import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Typography from "../../theme/Typography";
import Colors from "../../theme/Colors";
import LoadingScreen from "../info/LoadingScreen";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const MapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: 0.0196,
    longitudeDelta: 0.0152,
  });
  const [location, setLocation] = useState({
    coods: {},
  });

  const handleFetchUserLocation = useCallback(async () => {
    try {
      setLoading(true);

      // Request permissions to fetch the location
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        ErrorAlertModal("Permission to access location was denied", error);
        return;
      }

      // Fetch location only if has permissions
      let location = await Location.getCurrentPositionAsync({});
      setLocation((prevState) => ({ ...prevState, ...location }));
      setRegion((prevState) => ({
        ...prevState,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchUserLocation();
  }, [handleFetchUserLocation]);

  if (loading) return <LoadingScreen />;

  return (
    <MapView style={styles.map} region={region}>
      <Marker
        title="You are here"
        onCalloutPress={() =>
          setRegion((prevState) => ({
            ...prevState,
            latitudeDelta: 0.00596,
            longitudeDelta: 0.00552,
          }))
        }
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Trodden</Text>
      </View>
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  container: {
    // height: 200
  },
  title: {
    ...Typography.trodden,
    color: Colors.primary,
    textShadowColor: Colors.outline,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontSize: 30,
    position: "absolute",
    top: WINDOW_HEIGHT - 160,
    right: 0,
    padding: 10,
  },
});
