import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "../components/BodyText";
import InterestGridTile from "../components/InterestGridTile";
import BigButton from "../components/BigButton";
import { INTERESTS } from "../data/dummy_data";

const InterestScreen = (props) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const userData = useSelector((state) => state.userStore);

  useEffect(() => {
    console.log("selected Ids", selectedInterests);
    console.log("User Data:", userData);
  }, [selectedInterests]);

  const interestSelectionHandler = (id) => {
    const prevSelectedInterest = selectedInterests.find(
      (interest) => interest === id
    );

    prevSelectedInterest !== undefined
      ? setSelectedInterests((prevState) =>
          prevState.filter((interest) => interest !== id)
        )
      : setSelectedInterests((prevState) => [...prevState, id]);
  };

  const renderInterests = (itemData) => {
    return (
      <InterestGridTile
        title={itemData.item.name}
        imageUrl={itemData.item.path}
        onSelect={() => interestSelectionHandler(itemData.item.id)}
      />
    );
  };

  const selectionValidator = () => {
    const selectionCount = selectedInterests.length;

    if (selectionCount < 3) {
      Alert.alert(
        "Select more Interests",
        "Please select at least 3 interests to proceed",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }

    // TODO: add navigation
  };

  return (
    <View style={styles.screen}>
      <View style={{ width: "100%", marginBottom: 80 }}>
        <FlatList
          style={styles.list}
          data={INTERESTS}
          renderItem={renderInterests}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={() => (
            <BodyText>Select at least 3 interests</BodyText>
          )}
          ListHeaderComponentStyle={{
            marginTop: 30,
            marginBottom: 20,
            marginHorizontal: 20,
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BigButton style={styles.button} onPress={selectionValidator}>
          Done
        </BigButton>
        <View style={styles.bottomBars}>
          <BodyText style={styles.active}>-</BodyText>
          <BodyText style={styles.active}>-</BodyText>
          <BodyText style={styles.active}>-</BodyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  list: {
    backgroundColor: Colors.accent,
  },
  buttonContainer: {
    position: "absolute",
    width: Dimensions.get("screen").width,
    bottom: 0,
    backgroundColor: Colors.accent,
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  bottomBars: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  active: {
    ...Typography.bodyText,
    alignItems: "flex-end",
    backgroundColor: Colors.primary,
    height: 3,
    width: 20,
    marginHorizontal: 3,
  },
});

export default InterestScreen;
