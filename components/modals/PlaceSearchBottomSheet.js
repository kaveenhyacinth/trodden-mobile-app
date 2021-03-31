import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import Colors from "../../theme/Colors";

const API_KEY = Constants.manifest.extra.PLACE_API_KEY;

const PlaceSearch = (props) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={"Search"}
        onPress={props.onPress}
        query={{
          key: API_KEY,
          language: "en",
        }}
        styles={{
          textInput: {
            borderColor: Colors.outline,
            borderWidth: 2,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 0.4,
    width: Dimensions.get("screen").width,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: Colors.white,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
});

export default PlaceSearch;
