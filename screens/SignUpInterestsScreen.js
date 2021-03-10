//#region Imports
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getInterests } from "../store/actions/getInterests";
import Http from "../api/kit";
import Colors from "../theme/Colors";
import Typography from "../theme/Typography";
import BodyText from "../components/BodyText";
import InterestGridTile from "../components/InterestGridTile";
import BigButton from "../components/BigButton";
//#endregion

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const InterestScreen = (props) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const userData = useSelector((state) => state.userStore);
  const interetsStore = useSelector((state) => state.interestsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    handleLoadInterests();
    console.log("userData", userData);
    console.log("Interests", interetsStore);
  }, []);

  const checkIsValidSelection = () => {
    const selectionCount = selectedInterests.length;
    if (selectionCount < 3) return false;
    return true;
  };

  const handleLoadInterests = async () => {
    try {
      await getInterests()(dispatch);
    } catch (error) {
      Alert.alert(
        "Oh My trod!",
        error.message ?? "Something went wrong. Please try again later",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
      console.log("Error Happen", error);
    }
  };

  const handleSelectInterests = (id) => {
    const prevSelectedInterest = selectedInterests.find(
      (interest) => interest === id
    );
    console.log("Interests Selected", selectedInterests);

    prevSelectedInterest !== undefined
      ? setSelectedInterests((prevState) =>
          prevState.filter((interest) => interest !== id)
        )
      : setSelectedInterests((prevState) => [...prevState, id]);
  };

  const handleRenderInterests = (itemData) => {
    return (
      <InterestGridTile
        title={itemData.item.title}
        imageUrl={itemData.item.image}
        onSelect={() => handleSelectInterests(itemData.item._id)}
      />
    );
  };

  const handleSubmit = async () => {
    try {
      const isValid = checkIsValidSelection();
      if (!isValid)
        throw new Error("Please select at least 3 interests to proceed");
      console.log("User Data:", userData);
    } catch (error) {
      Alert.alert(
        "Select more Interests",
        error.message ?? "Something went wrong! Please try again later...",
        [
          {
            text: "I Will",
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
  };

  //#region TODO:
  // TODO: handleOnDone

  // Upload image
  // const body = new FormData();
  // body.append("image", {
  //   uri: imageFile.uri,
  //   name: `image.${fileType}`,
  //   type: `image/${fileType}`,
  // });

  // const response = await Http.post("/image/add", body, {
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  // console.log("Image file path", response.data.result);

  // // Check response success
  // if (!response) throw new Error("Something wend wrong");
  //#endregion

  return (
    <View style={styles.screen}>
      <View style={{ width: "100%", marginBottom: 80 }}>
        <FlatList
          style={styles.list}
          data={interetsStore.interests}
          renderItem={handleRenderInterests}
          keyExtractor={(item) => item._id}
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
        <BigButton style={styles.button} onPress={handleSubmit}>
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

//#region Styles
const styles = StyleSheet.create({
  screen: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  list: {
    backgroundColor: Colors.accent,
  },
  buttonContainer: {
    position: "absolute",
    width: SCREEN_WIDTH,
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
//#endregion

export default InterestScreen;
