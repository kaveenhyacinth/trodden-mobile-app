import React, { useState, useEffect, useCallback } from "react";
import { Alert, Dimensions, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "../../services/deviceStorage";
import {
  getOwnMemories,
  getNomadMemories,
} from "../../store/actions/getMemories";
import Memory from "../../components/Memory";
import EmptyScreen from "../extra/EmptyScreen";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const TimelineScreen = ({
  authType,
  HeaderHeight,
  TabBarHeight,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const dispatch = useDispatch();
  const tempNomadStore = useSelector((state) => state.tempNomadStore);
  const nomadStore = useSelector((state) => state.nomadStore);
  const memoriesStore = useSelector((state) => state.memoriesStore);

  useEffect(() => {
    if (authType === "self") loadOwnMemories();
    if (!authType || authType === "non-self") loadNomadMemories();
  }, [loadNomadMemories, loadOwnMemories]);

  const loadNomadMemories = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      if (nomadId == tempNomadStore.nomadId) setIsOwner(true);

      await getNomadMemories(tempNomadStore.nomadId)(dispatch);
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
  }, [tempNomadStore.nomadId]);

  const loadOwnMemories = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      if (nomadId == nomadStore._id) setIsOwner(true);
      await getOwnMemories(nomadStore._id)(dispatch);
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
  }, [nomadStore._id]);

  const handleRefresh = async () =>
    authType === "self" ? await loadOwnMemories() : await loadNomadMemories();

  const renderProfileTimeline = ({ item }) =>
    authType === "self" ? (
      <Memory type="self" data={item} />
    ) : (
      <Memory type="non-self" data={item} />
    );

  return (
    <Animated.FlatList
      style={{ flex: 1 }}
      data={
        authType === "self"
          ? memoriesStore.ownMemories
          : memoriesStore.nomadMemories
      }
      renderItem={renderProfileTimeline}
      ListEmptyComponent={<EmptyScreen />}
      refreshing={loading}
      onRefresh={handleRefresh}
      scrollToOverflowEnabled={true}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        minHeight: WINDOW_HEIGHT - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default TimelineScreen;
