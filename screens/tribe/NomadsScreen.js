import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { Fetch } from "../../helpers/deviceStorageHandler";
import { useDispatch, useSelector } from "react-redux";
import { fetchNomadsTribe } from "../../redux";
import EmptyScreen from "../info/EmptyScreen";
import Colors from "../../theme/Colors";
import NomadRequestTile from "../../components/modals/NomadRequestTileModal";
import ErrorAlertModal from "../../components/modals/ErrorAlertModal";

const InboxScreen = (props) => {
  const dispatch = useDispatch();

  const tribeStore = useSelector((state) => state.tribeStore);

  useEffect(() => {
    let isSubscribed = true;
    fetchBondList(isSubscribed);
    return () => (isSubscribed = false);
  }, [fetchBondList]);

  const fetchBondList = useCallback(async (isSubscribed) => {
    try {
      if (isSubscribed) {
        const nomadId = await Fetch("nomadId");
        await fetchNomadsTribe(nomadId)(dispatch);
      }
    } catch (error) {
      ErrorAlertModal(error.message, error);
    }
  }, []);

  const renderNomads = ({ item }) => (
    <NomadRequestTile
      onNavigate={() => handleNavigation(item._id)}
      onRefresh={fetchBondList}
      data={item}
    />
  );

  const handleNavigation = (id) => {
    props.navigation.navigate("Profile", { id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.accent }}>
      <FlatList
        data={tribeStore.nomads.data.tribe}
        renderItem={renderNomads}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyScreen />}
        refreshing={tribeStore.loading}
        onRefresh={() => fetchBondList()}
      />
    </SafeAreaView>
  );
};

export default InboxScreen;
