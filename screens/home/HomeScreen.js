import React, { useState, useEffect, useCallback, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { useSelector, useDispatch } from "react-redux";
import { fetchNomadProfile, fetchNomadMemories, fetchFeed } from "../../redux";
import EmptyScreen from "../info/EmptyScreen";
import LoadingScreen from "../info/LoadingScreen";
import Colors from "../../theme/Colors";
import CreateMemoryHeader from "../../components/headers/CreateMemoryHeader";
import CustomHeaderButton from "../../components/ui/CustomHeaderButton";
import Memory from "../../components/modals/MemoryModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [nomadId, setUserId] = useState(undefined);
  const componentIsMounted = useRef(true);
  const dispatch = useDispatch();
  const feedStore = useSelector((state) => state.feedStore);

  // Cleanup fn
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("Feedstore last post", feedStore.data[0]);
  }, [feedStore.data]);

  useEffect(() => {
    (async () => {
      try {
        const nomadId = await Fetch("nomadId");
        if (componentIsMounted.current) setUserId(nomadId);
      } catch (error) {
        ErrorAlertModal(error.message, error);
      }
    })();
  }, [Fetch, setUserId, ErrorAlertModal, componentIsMounted]);

  useEffect(() => {
    repaintHeaderButton();
  }, [repaintHeaderButton]);

  useEffect(() => {
    fetchOwner(componentIsMounted);
  }, [fetchOwner]);

  useEffect(() => {
    fetchFeedFromApi();
  }, [fetchFeedFromApi]);

  const fetchOwner = useCallback(async (isSubscribed) => {
    try {
      const nomadId = await Fetch("nomadId");
      if (isSubscribed) {
        await fetchNomadProfile(nomadId)(dispatch);
        await fetchNomadMemories(nomadId)(dispatch);
      }
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  }, []);

  const fetchFeedFromApi = useCallback(async () => {
    try {
      setLoading(true);
      const nomadId = await Fetch("nomadId");
      await fetchFeed(nomadId)(dispatch);
      console.log("Fetching feed", feedStore.loading);
    } catch (error) {
      ErrorAlertModal(error.message, error);
    } finally {
      setLoading(false);
    }
  }, [nomadId, feedStore.loading]);

  const repaintHeaderButton = useCallback(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Map"
            IconComponent={Ionicons}
            iconName="map-outline"
            color={Colors.primary}
            onPress={() => {}}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const renderListHeader = () => (
    <CreateMemoryHeader onPress={() => props.navigation.navigate("newMemo")} />
  );

  const renderFeed = ({ item }) => <Memory type="feed" data={item} />;

  return (
    <FlatList
      data={feedStore.data}
      renderItem={renderFeed}
      ListHeaderComponent={renderListHeader}
      ListEmptyComponent={() => <EmptyScreen />}
      style={styles.screen}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      refreshing={loading}
      onRefresh={fetchFeedFromApi}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default HomeScreen;
