import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addDayPlan, updateDayPlan } from "../../redux";
import MapView, { Marker } from "react-native-maps";
import ScreenView from "../../components/ui/ScreenView";
import InputBox from "../../components/ui/InputBox";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import Colors from "../../theme/Colors";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const MAP_REGION = {
  latitude: 7.8774222,
  longitude: 80.7003428,
  latitudeDelta: 4,
  longitudeDelta: 3,
};

const TripDayPlannerScreen = (props) => {
  const tripPlanStore = useSelector((state) => state.tripPlanStore);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [note, setNote] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let title = props.route.params.title
      ? `Day ${props.route.params.day} of ${props.route.params.title}`
      : `Day ${props.route.params.day}`;
    props.navigation.setOptions({
      title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            color={Colors.primary}
            onPress={() => handleSave(note, selectedLocations)}
          />
        </HeaderButtons>
      ),
    });
  }, [
    props.route.params.day,
    props.route.params.title,
    note,
    selectedLocations,
  ]);

  useEffect(() => {
    if (tripPlanStore.dayPlans.length !== 0) {
      const index = tripPlanStore.dayPlans.findIndex(
        (dayPlan) => dayPlan.day === props.route.params.day
      );
      if (index === -1) return;

      setSelectedLocations([
        ...tripPlanStore.dayPlans[index].selectedLocations,
      ]);
      setNote(tripPlanStore.dayPlans[index].note);
    }
  }, [tripPlanStore, props]);

  const handleSave = (note, selectedLocations) => {
    console.log("data to save", { note, selectedLocations });

    if (!note || !selectedLocations) {
      alert("Please add a note and mark destinations on the map...");
      return;
    }
    const dayObj = {
      day: props.route.params.day,
      note,
      selectedLocations,
    };

    if (tripPlanStore.dayPlans.length !== 0) {
      const index = tripPlanStore.dayPlans.findIndex(
        (dayPlan) => dayPlan.day === props.route.params.day
      );

      if (index !== -1) {
        dispatch(updateDayPlan(index, dayObj));
      } else {
        dispatch(addDayPlan(dayObj));
      }
    } else {
      dispatch(addDayPlan(dayObj));
    }
    props.navigation.goBack();
  };

  const handlePinMarker = (event) => {
    event.persist();

    setSelectedLocations((prevState) => [
      ...prevState,
      {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      },
    ]);
  };

  const handleUnPinMarker = (event) => {
    event.persist();

    const isExist = selectedLocations.findIndex(
      (location) =>
        location.latitude === event.nativeEvent.coordinate.latitude &&
        location.longitude === event.nativeEvent.coordinate.longitude
    );

    if (isExist !== -1) {
      const updatedList = selectedLocations.filter(
        (location) =>
          location.latitude !== event.nativeEvent.coordinate.latitude &&
          location.longitude !== event.nativeEvent.coordinate.longitude
      );
      setSelectedLocations([...updatedList]);
    }
  };

  return (
    <ScreenView style={styles.screen}>
      <InputBox
        style={styles.noteInput}
        value={note}
        placeholder={`Notes for the ${props.route.params.title || ""} day ${
          props.route.params.day
        }`}
        onChangeText={(text) => setNote(text)}
        multiline={true}
        returnKeyType="none"
      />
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          region={MAP_REGION}
          onPress={handlePinMarker}
        >
          {selectedLocations &&
            selectedLocations.map((location, index) => (
              <Marker
                key={index.toString()}
                title="Pinned Destination"
                coordinate={location}
                onPress={handleUnPinMarker}
              ></Marker>
            ))}
        </MapView>
      </View>
    </ScreenView>
  );
};

export default TripDayPlannerScreen;

const styles = StyleSheet.create({
  screen: {
    // paddingTop: 20,
    // paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  noteInput: {
    height: WINDOW_HEIGHT * 0.2,
    width: WINDOW_WIDTH,
    textAlignVertical: "top",
    padding: 10,
    paddingBottom: 0,
    borderWidth: 0,
  },
  mapWrapper: {
    width: WINDOW_WIDTH,
  },
  map: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.635,
  },
});
