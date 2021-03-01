import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../theme/Colors"
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
    <View>
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
          marginVertical: 20,
          marginHorizontal: 20,
        }}
        ListFooterComponent={() => (
          <BigButton style={styles.button} onPress={selectionValidator}>
            Done
          </BigButton>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    backgroundColor: Colors.accent
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default InterestScreen;
