import React, { useState, useEffect, useCallback } from "react";
import { Dimensions, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "../../helpers/deviceStorageHandler";
import {
  getOwnMemories,
  getNomadMemories,
} from "../../store/actions/getMemories";
import EmptyScreen from "../info/EmptyScreen";
import Memory from "../../components/modals/MemoryModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const { height: WINDOW_HEIGHT } = Dimensions.get("window");

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
    if (authType === "self") fatchOwnMemories();
    if (!authType || authType === "non-self") fetchMemoriesOfUser();
  }, [fetchMemoriesOfUser, fatchOwnMemories]);

  const fetchMemoriesOfUser = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      if (nomadId == tempNomadStore.nomadId) setIsOwner(true);

      await getNomadMemories(tempNomadStore.nomadId)(dispatch);
    } catch (error) {
      ErrorAlertModal(error, message, error);
    } finally {
      setLoading(false);
    }
  }, [tempNomadStore.nomadId]);

  const fatchOwnMemories = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      if (nomadId == nomadStore._id) setIsOwner(true);
      await getOwnMemories(nomadStore._id)(dispatch);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [nomadStore._id]);

  const handleRefresh = async () =>
    authType === "self"
      ? await fatchOwnMemories()
      : await fetchMemoriesOfUser();

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
