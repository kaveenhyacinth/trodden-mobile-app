import React, { useState, useEffect, useCallback } from "react";
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
  const [loading] = useState(false);
  const dispatch = useDispatch();

  const feedStore = useSelector((state) => state.feedStore);

  useEffect(() => {
    repaintHeaderButton();
  }, [repaintHeaderButton]);

  useEffect(() => {
    let isSubscribed = true;
    fetchOwner(isSubscribed);
    return () => (isSubscribed = false);
  }, [fetchOwner]);

  useEffect(() => {
    let isSubscribed = true;
    fetchFeedFromApi(isSubscribed);
    return () => (isSubscribed = false);
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

  const fetchFeedFromApi = useCallback(async (isSubscribed) => {
    try {
      const nomadId = await Fetch("nomadId");
      if (isSubscribed) await fetchFeed(nomadId)(dispatch);
      console.log("Fetching feed");
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  }, []);

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

  const handleRefresh = async () => await fetchFeedFromApi();

  // if (feedStore.loading) return <LoadingScreen />;

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
      onRefresh={handleRefresh}
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
