import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "../../services/deviceStorage";
import { getNomads } from "../../store/actions/storeNomad";
import Colors from "../../theme/Colors";
import ScreenView from "../../components/ScreenView";
import Memory from "../../components/Memory";
import NewPost from "../../components/NewPostHome";
import EmptyScreen from "../extra/EmptyScreen";
import LoadingScreen from "../extra/LoadingScreen";

const HomeScreen = (props) => {
  const [memos, setMemos] = useState(true);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchOwner = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await getNomads(nomadId)(dispatch);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOwner();
  }, [fetchOwner]);

  const nomadStore = useSelector((state) => state.nomadStore);

  useEffect(() => console.log("Current user Data: " + nomadStore), []);

  if (loading) return <LoadingScreen />;

  return (
    <ScreenView style={styles.screen}>
      <NewPost onPress={() => props.navigation.navigate("newMemo")} />
      {/* {memos ? (
        <>
          <Memory />
          <Memory />
        </>
      ) : (
        <EmptyScreen />
      )} */}
      <EmptyScreen />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
