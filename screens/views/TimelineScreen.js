import React, { useState, useEffect } from "react";
import { View, Image, Alert, FlatList, Dimensions } from "react-native";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "../../services/deviceStorage";
import {
  getOwnMemories,
  getNomadMemories,
} from "../../store/actions/getMemories";
import api from "../../api/api";
import Colors from "../../theme/Colors";
import Typography from "../../theme/Typography";
import Memory from "../../components/Memory";
import EmptyScreen from "../extra/EmptyScreen";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const TimelineScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [nomadMemos, setNomadMemos] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const dispatch = useDispatch();
  const tempNomadStore = useSelector((state) => state.tempNomadStore);

  useEffect(() => {
    if (props.type === "self") loadOwnMemories();
    if (!props.type || props.type === "non-self") loadNomadMemories();
  }, [memoriesStore]);

  const memoriesStore = useSelector((state) => state.memoriesStore);

  const loadNomadMemories = async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      if (nomadId == tempNomadStore.nomadId) setIsOwner(true);

      getNomadMemories(tempNomadStore.nomadId)(dispatch);
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

  const loadOwnMemories = async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await getOwnMemories(nomadId)(dispatch);
      setIsOwner(true);
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

  const handleRefresh = () =>
    props.type === "self" ? loadOwnMemories() : loadNomadMemories();

  const renderProfileTimeline = ({ item }) =>
    props.type === "self" ? (
      <Memory type="self" data={item} />
    ) : (
      <Memory type="non-self" data={item} />
    );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={
          props.type === "self"
            ? memoriesStore.ownMemories
            : memoriesStore.nomadMemories
        }
        renderItem={renderProfileTimeline}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={loading}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default TimelineScreen;
