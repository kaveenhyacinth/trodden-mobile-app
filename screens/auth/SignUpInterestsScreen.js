//#region Imports
import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, Alert, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getInterests } from "../../store/actions/interests";
import api from "../../api/api";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import BodyText from "../../components/BodyText";
import InterestGridTile from "../../components/InterestGridTile";
import BigButton from "../../components/BigButton";
import LoadingScreen from "../extra/LoadingScreen";
import ErrorAlert from "../../components/ErrorAlert";
//#endregion

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const InterestScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const userStore = useSelector((state) => state.userStore);
  const interetsStore = useSelector((state) => state.interestsStore);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  const fetchInterests = useCallback(async () => {
    try {
      setLoading(true);
      await getInterests()(dispatch);
    } catch (error) {
      <ErrorAlert message={error.message} />;
      console.log("Error Happen", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const checkIsValidSelection = () => {
    const selectionCount = selectedInterests.length;
    if (selectionCount < 3) return false;
    return true;
  };

  const handlePrepareUserData = (userStore, interests) => {
    return {
      ...userStore,
      interests,
    };
  };

  const handleSelectInterests = (id) => {
    const prevSelectedInterest = selectedInterests.find(
      (interest) => interest === id
    );

    if (prevSelectedInterest !== undefined) {
      setSelectedInterests((prevState) =>
        prevState.filter((interest) => interest !== id)
      );
    } else {
      setSelectedInterests((prevState) => [...prevState, id]);
    }
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

  /** Upload Image
   * @param {Object} body Image data
   * @returns Filename
   */
  const handleUploadImage = async (body) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await api.uploadImage(body)(config);
      console.log("Image file path", response.data.result);

      // Check response success
      if (!response.data.result)
        throw new Error(
          "Something went wrong while saving the profile picture! Please try again later..."
        );

      return response.data.result.filename;
    } catch (error) {
      throw error;
    }
  };

  /** Update user profile
   * @param {Object} body userData to update
   * @returns boolean
   */
  const handleUpdateUserProfile = async (body) => {
    try {
      console.log("Inside HandleUpdateUseProfile");
      const response = await api.updateProfile(body);

      if (!response.data.success)
        throw new Error(
          "Something went wrong while updating the information! Please try again later..."
        );

      console.log("Saved Data", response.data.result);
      return response.data.success;
    } catch (error) {
      console.log("Error =>", error.response);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const isValid = checkIsValidSelection();
      if (!isValid)
        throw new Error("Please select at least 3 interests to proceed...");

      const data = handlePrepareUserData(userStore, selectedInterests);
      console.log("Data to send to the server\n", data);

      // Upload image
      const ImageBody = new FormData();
      ImageBody.append("image", {
        uri: data.ImageDataUri,
        name: data.ImageDataName,
        type: data.ImageDataType,
      });

      const filename = await handleUploadImage(ImageBody);
      if (!filename)
        throw new Error(
          "Something went wrong while saving the profile picture! Please try again later..."
        );

      const {
        id,
        city,
        country,
        region,
        contact,
        birthdate,
        gender,
        bio,
        occupation,
        interests,
      } = data;

      const userBody = {
        userId: id,
        bio,
        occupation,
        contact,
        city,
        country,
        region,
        birthdate,
        gender,
        interests,
        filename,
      };

      const isUpdatedUserProfile = await handleUpdateUserProfile(userBody);

      if (!isUpdatedUserProfile)
        throw new Error(
          "Something went wrong while updating! Please try again later..."
        );

      await Save("nomadId", id);

      props.navigation.replace("core", {
        screen: "Home",
      });
    } catch (error) {
      <ErrorAlert message={error.message} />;
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.screen}>
      <View style={{ width: "100%", marginBottom: 80 }}>
        <FlatList
          style={styles.list}
          data={interetsStore.data}
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
    width: WINDOW_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  list: {
    backgroundColor: Colors.accent,
  },
  buttonContainer: {
    position: "absolute",
    width: WINDOW_WIDTH,
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
