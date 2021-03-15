import React, { useState, useEffect } from "react";
import { View, Image, Alert, FlatList, Dimensions } from "react-native";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Fetch } from "../../services/deviceStorage";
import { getOwnMemories } from "../../store/actions/getOwnMemories";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import Memory from "../../components/Memory";
import EmptyScreen from "../extra/EmptyScreen";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const TimelineScreen = (props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const ownMemoriesStore = useSelector((state) => state.ownMemoriesStore);

  // ownMemoriesStore.memories = [];

  useEffect(() => {
    loadOwnMemories();
  }, [props]);

  // useEffect(() => {
  //   console.log("Memories:", ownMemoriesStore);
  // }, [ownMemoriesStore, isFocused]);

  const loadOwnMemories = async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await getOwnMemories(nomadId)(dispatch);
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
  };

  const renderProfileTimeline = ({ item }) => <Memory data={item} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={ownMemoriesStore.memories}
        renderItem={renderProfileTimeline}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={() => loadOwnMemories()}
      />
    </View>
  );
};

export default TimelineScreen;
